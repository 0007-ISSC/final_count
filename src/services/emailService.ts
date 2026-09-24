import nodemailer, { type Transporter } from 'nodemailer';

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  previewUrl?: string;
  channel: 'smtp' | 'gmail' | 'resend' | 'ethereal' | 'console';
  error?: string;
}

let cachedTransporter: Transporter | null = null;
let cachedTransporterType: 'smtp' | 'gmail' | 'ethereal' | null = null;

/**
 * Resolves or initializes the active Nodemailer transporter.
 * Supports:
 * 1. Custom SMTP credentials via SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 * 2. Gmail App Password via GMAIL_USER, GMAIL_APP_PASSWORD
 * 3. Automatic fallback to Nodemailer Ethereal real test SMTP (generates live web preview URLs)
 */
async function getEmailTransporter(): Promise<{ transporter: Transporter; type: 'smtp' | 'gmail' | 'ethereal' }> {

  if (cachedTransporter && cachedTransporterType) {
    return { transporter: cachedTransporter, type: cachedTransporterType };
  }

  // 1. Custom SMTP configuration
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const port = Number(process.env.SMTP_PORT) || 587;
      const secure = process.env.SMTP_SECURE === 'true' || port === 465;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      cachedTransporter = transporter;
      cachedTransporterType = 'smtp';
      console.log(`[EmailService] Configured custom SMTP transport via ${process.env.SMTP_HOST}:${port}`);
      return { transporter, type: 'smtp' };
    } catch (err: any) {
      console.warn('[EmailService] Failed to initialize custom SMTP transporter:', err?.message);
    }
  }

  // 2. Gmail App Password configuration
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      cachedTransporter = transporter;
      cachedTransporterType = 'gmail';
      console.log(`[EmailService] Configured Gmail transport via ${process.env.GMAIL_USER}`);
      return { transporter, type: 'gmail' };
    } catch (err: any) {
      console.warn('[EmailService] Failed to initialize Gmail transporter:', err?.message);
    }
  }

  // 3. Ethereal real test SMTP transport
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    cachedTransporter = transporter;
    cachedTransporterType = 'ethereal';
    console.log(`[EmailService] Initialized Ethereal real SMTP test inbox (${testAccount.user})`);
    return { transporter, type: 'ethereal' };
  } catch (err: any) {
    console.error('[EmailService] Could not initialize Ethereal transporter:', err?.message);
    throw err;
  }
}

/**
 * Sends a real 6-digit OTP verification code to a recipient's email address.
 */
export async function sendOtpEmail(
  toEmail: string,
  otpCode: string,
  recipientName?: string
): Promise<EmailDispatchResult> {
  const cleanEmail = toEmail.trim().toLowerCase();
  const displayName = recipientName ? recipientName.trim() : cleanEmail.split('@')[0];
  const timestampStr = new Date().toUTCString();

  // Try Resend API if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'HealthGPT Clinical <onboarding@resend.dev>',
          to: [cleanEmail],
          subject: `🔐 Your HealthGPT Verification Code: ${otpCode}`,
          html: generateOtpHtmlEmail(cleanEmail, displayName, otpCode, timestampStr),
          text: `Hello ${displayName},\n\nYour 6-digit HealthGPT verification code is: ${otpCode}\n\nThis code will expire in 15 minutes. For your clinical data security, never share this code with anyone.\n\nHealthGPT Medical Platform - ${timestampStr}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(`[EmailService] Resend email dispatched to ${cleanEmail}, id: ${data?.id}`);
        return {
          success: true,
          messageId: data?.id,
          channel: 'resend',
        };
      }
    } catch (resendErr: any) {
      console.warn('[EmailService] Resend dispatch failed, falling back to SMTP/Ethereal:', resendErr?.message);
    }
  }

  // Use Nodemailer SMTP / Ethereal transporter
  try {
    const { transporter, type } = await getEmailTransporter();

    const fromAddress = process.env.SMTP_FROM || process.env.GMAIL_USER || '"HealthGPT Clinical Auth" <auth@healthgpt.ai>';

    const info = await transporter.sendMail({
      from: fromAddress,
      to: cleanEmail,
      subject: `🔐 HealthGPT Login Verification Passcode: ${otpCode}`,
      text: `Hello ${displayName},\n\nYour 6-digit HealthGPT verification code is: ${otpCode}\n\nThis code is valid for 15 minutes. Do not share this code with anyone.\n\nHealthGPT Clinical Intelligence Platform\nGenerated at: ${timestampStr}`,
      html: generateOtpHtmlEmail(cleanEmail, displayName, otpCode, timestampStr),
    });

    const previewUrl = type === 'ethereal' ? nodemailer.getTestMessageUrl(info) || undefined : undefined;

    console.log(`[EmailService] OTP email delivered to ${cleanEmail} via [${type}]. MessageId: ${info.messageId}`);
    if (previewUrl) {
      console.log(`[EmailService] Real test email preview URL: ${previewUrl}`);
    }

    return {
      success: true,
      messageId: info.messageId,
      previewUrl,
      channel: type,
    };
  } catch (err: any) {
    console.error(`[EmailService] Error dispatching OTP email to ${cleanEmail}:`, err?.message);
    return {
      success: false,
      channel: 'console',
      error: err?.message || 'Failed to dispatch email over SMTP',
    };
  }
}

/**
 * Generates an ultra-clean, clinical-grade responsive HTML email.
 */
function generateOtpHtmlEmail(email: string, name: string, otp: string, timestamp: string): string {
  const digits = otp.split('');
  const digitBadges = digits
    .map(
      d =>
        `<span style="display:inline-block;width:44px;height:52px;line-height:52px;margin:0 4px;background:#ffffff;border:2px solid #0d9488;border-radius:8px;font-size:26px;font-weight:800;color:#0f766e;text-align:center;box-shadow:0 3px 8px rgba(13,148,136,0.15);">${d}</span>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HealthGPT Security Verification Code</title>
</head>
<body style="margin:0;padding:0;background-color:#f4efe6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4efe6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 36px rgba(0,0,0,0.08);border:1px solid #e7ded2;" cellspacing="0" cellpadding="0">
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg, #0d9488 0%, #065f46 100%);padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:0.5px;">HealthGPT</h1>
              <p style="margin:6px 0 0;color:#ccfbf1;font-size:13px;letter-spacing:1px;text-transform:uppercase;font-weight:600;">Clinical Intelligence &amp; Care Portal</p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding:32px 32px 24px;">
              <p style="margin:0 0 16px;font-size:16px;font-weight:700;color:#0f172a;">Hello ${name},</p>
              <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#475569;">
                You requested a secure one-time passcode (OTP) to sign in to your HealthGPT patient account (<strong>${email}</strong>). Use the code below to complete your authentication:
              </p>

              <!-- OTP Code Display Card -->
              <div style="background:#f0fdfa;border:2px dashed #14b8a6;border-radius:12px;padding:24px 16px;text-align:center;margin:0 0 24px;">
                <div style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#0d9488;">
                  Your 6-Digit One-Time Passcode
                </div>
                <div style="margin:12px 0;">
                  ${digitBadges}
                </div>
                <div style="margin:12px 0 0;font-size:12px;color:#0f766e;font-weight:600;">
                  ⏱ This code is valid for 15 minutes
                </div>
              </div>

              <!-- Security Information -->
              <div style="background:#fefce8;border:1px solid #fef08a;border-radius:8px;padding:14px 16px;margin:0 0 24px;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#854d0e;">
                  <strong>🛡️ Security Advice:</strong> If you did not request this login verification code, please ignore this email or review your clinical account credentials immediately. Never share your passcode with anyone.
                </p>
              </div>

              <p style="margin:0;font-size:13px;line-height:1.5;color:#64748b;">
                Best regards,<br>
                <strong style="color:#0f172a;">HealthGPT Clinical Security Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;color:#94a3b8;">
                Dispatched at ${timestamp} to ${email}
              </p>
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                HealthGPT · Where AI Meets Clinical HealthCare · HIPAA &amp; NDHM Compliant Security
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
