import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  projectId: string;
}

export interface TableStatus {
  name: string;
  exists: boolean;
  count: number | null;
  error?: string | null;
}

export interface SupabaseConnectionStatus {
  connected: boolean;
  url: string;
  projectId: string;
  latencyMs: number;
  tables: Record<string, TableStatus>;
  message: string;
  sqlSchema: string;
}

// Target database tables for HealthGPT
export const SUPABASE_TABLES = [
  'users',
  'emergency_profiles',
  'emergency_contacts',
  'prescriptions',
  'medication_reminders',
  'symptom_logs',
  'health_metrics',
  'appointments',
  'period_logs',
  'conversations',
  'messages'
] as const;

export type SupabaseTableName = typeof SUPABASE_TABLES[number];

export const SUPABASE_SQL_SCHEMA = `-- ====================================================================
-- HealthGPT Supabase Database Schema
-- Project: aympyxmjgbgmcvcdnzyt
-- ====================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  age INTEGER,
  gender TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Emergency Profiles Table
CREATE TABLE IF NOT EXISTS public.emergency_profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  weight_kg NUMERIC,
  height_cm NUMERIC,
  bmi TEXT,
  allergies JSONB DEFAULT '[]'::jsonb,
  primary_conditions JSONB DEFAULT '[]'::jsonb,
  active_medications JSONB DEFAULT '[]'::jsonb,
  paramedic_directives TEXT,
  primary_physician TEXT,
  preferred_hospital TEXT,
  insurance_policy TEXT,
  is_organ_donor BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Emergency Contacts Table
CREATE TABLE IF NOT EXISTS public.emergency_contacts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  priority INTEGER DEFAULT 1,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  notify_on_sos BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Prescriptions Table
CREATE TABLE IF NOT EXISTS public.prescriptions (
  id TEXT PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  medicine_name TEXT NOT NULL,
  generic_salt TEXT,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  timing TEXT NOT NULL,
  meal_timing TEXT,
  prescribing_doctor TEXT,
  hospital_clinic TEXT,
  diagnosis TEXT,
  start_date DATE DEFAULT CURRENT_DATE,
  duration_days INTEGER DEFAULT 30,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Medication Reminders Table
CREATE TABLE IF NOT EXISTS public.medication_reminders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  prescription_id TEXT,
  medicine_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  timing TEXT NOT NULL,
  reminder_times JSONB DEFAULT '["09:00"]'::jsonb,
  instructions TEXT,
  duration_days INTEGER DEFAULT 30,
  active BOOLEAN DEFAULT TRUE,
  taken_today BOOLEAN DEFAULT FALSE,
  last_taken_at TIMESTAMPTZ,
  days_remaining INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Symptom Logs Table
CREATE TABLE IF NOT EXISTS public.symptom_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  symptom TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT DEFAULT '🩺',
  severity INTEGER DEFAULT 3,
  triggers TEXT,
  relief_action TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Health Metrics Table
CREATE TABLE IF NOT EXISTS public.health_metrics (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  context TEXT,
  notes TEXT,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  doctor_id INTEGER NOT NULL,
  doctor_name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  hospital TEXT,
  city TEXT,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_age INTEGER,
  patient_gender TEXT,
  mode TEXT DEFAULT 'video',
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  symptoms TEXT,
  status TEXT DEFAULT 'confirmed',
  token_number TEXT,
  fee_inr NUMERIC DEFAULT 1000,
  video_link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Period Daily Logs Table
CREATE TABLE IF NOT EXISTS public.period_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  flow TEXT DEFAULT 'none',
  mood TEXT DEFAULT 'calm',
  energy TEXT DEFAULT 'normal',
  pain_score INTEGER DEFAULT 0,
  cramps_intensity TEXT DEFAULT 'none',
  temperature NUMERIC(4,2),
  water_liters NUMERIC(3,1),
  sleep_hours NUMERIC(3,1),
  stress_level INTEGER DEFAULT 2,
  symptoms JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Conversations & Messages
CREATE TABLE IF NOT EXISTS public.conversations (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Clinical Consultation',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable public read/write permissions for publishable anon client demo
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_reminders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_metrics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.period_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;

-- Grant permissions to public roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Ensure permissive RLS fallback policies
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('DROP POLICY IF EXISTS "allow_all_anon" ON public.%I;', t);
    EXECUTE format('CREATE POLICY "allow_all_anon" ON public.%I FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);', t);
  END LOOP;
END $$;
`;

export class SupabaseService {
  private static client: SupabaseClient | null = null;
  private static config: SupabaseConfig = {
    url: 'https://aympyxmjgbgmcvcdnzyt.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5bXB5eG1qZ2JnbWN2Y2Ruenl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMzEwMzQsImV4cCI6MjEwMjkwNzAzNH0.cQhqg82-P9HoPnXJFWxb_ygLpTc3dBBdVK1SxkyxO4c',
    projectId: 'aympyxmjgbgmcvcdnzyt'
  };

  private static cachedStatus: SupabaseConnectionStatus | null = null;
  private static lastCheckTimestamp = 0;
  private static readonly STATUS_CACHE_TTL = 30000; // 30s cache to avoid hammering Supabase

  /**
   * Quick check if Supabase backend is currently known to be online
   */
  public static isOnline(): boolean {
    return this.cachedStatus ? this.cachedStatus.connected : false;
  }

  /**
   * Automatically normalizes Supabase dashboard URLs (e.g., https://supabase.com/dashboard/project/...)
   * to their correct REST API endpoint (https://<project-ref>.supabase.co)
   */
  public static normalizeUrl(rawUrl?: string, projectId?: string): string {
    let url = (rawUrl || '').trim();
    const pid = (projectId || process.env.SUPABASE_PROJECT_ID || 'aympyxmjgbgmcvcdnzyt').trim();

    // 1. Convert dashboard project URL e.g. https://supabase.com/dashboard/project/aympyxmjgbgmcvcdnzyt
    const dashboardMatch = url.match(/supabase\.com\/dashboard\/project\/([a-zA-Z0-9_-]+)/i);
    if (dashboardMatch && dashboardMatch[1]) {
      return `https://${dashboardMatch[1]}.supabase.co`;
    }

    // 2. If given only the raw project ID
    if (/^[a-zA-Z0-9_-]{15,30}$/.test(url)) {
      return `https://${url}.supabase.co`;
    }

    // 3. If empty or invalid URL without .supabase.co, fallback to project ref
    if (!url || (!url.includes('.supabase.co') && !url.startsWith('http://localhost'))) {
      if (pid) {
        return `https://${pid}.supabase.co`;
      }
    }

    // Strip trailing slash
    return url.replace(/\/+$/, '');
  }

  /**
   * Returns or lazily initializes the Supabase client instance with a fast request timeout
   */
  public static getClient(): SupabaseClient {
    if (!this.client) {
      const cfg = this.getConfig();

      // Custom fetch with 3500ms timeout to prevent requests from hanging if Supabase gateway lags
      const fetchWithTimeout = (url: any, options: any = {}) => {
        const timeoutMs = 3500;
        const controller = new AbortController();
        const timerId = setTimeout(() => controller.abort(), timeoutMs);

        if (options.signal) {
          options.signal.addEventListener('abort', () => controller.abort());
        }

        return fetch(url, {
          ...options,
          signal: controller.signal
        }).finally(() => {
          clearTimeout(timerId);
        });
      };

      this.client = createClient(cfg.url, cfg.anonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        },
        global: {
          fetch: fetchWithTimeout as any
        }
      });
    }
    return this.client;
  }

  /**
   * Get current configuration with normalized URL
   */
  public static getConfig(): SupabaseConfig {
    const rawUrl = process.env.SUPABASE_URL || this.config.url;
    const projectId = process.env.SUPABASE_PROJECT_ID || this.config.projectId || 'aympyxmjgbgmcvcdnzyt';
    const url = this.normalizeUrl(rawUrl, projectId);
    const anonKey = (process.env.SUPABASE_ANON_KEY || this.config.anonKey).trim();

    return {
      url,
      anonKey,
      projectId
    };
  }

  /**
   * Check connection to Supabase and inspect table statuses
   */
  public static async testConnection(forceRefresh = false): Promise<SupabaseConnectionStatus> {
    const now = Date.now();
    if (!forceRefresh && this.cachedStatus && (now - this.lastCheckTimestamp < this.STATUS_CACHE_TTL)) {
      return this.cachedStatus;
    }

    const start = Date.now();
    const config = this.getConfig();
    const client = this.getClient();
    const tableStatuses: Record<string, TableStatus> = {};

    let connected = false;
    let message = '';

    try {
      // Test basic connectivity via a lightweight query
      const { error: testErr } = await client.from('users').select('id').limit(1);
      const latencyMs = Date.now() - start;

      // Even if 'users' table is not created yet (PGRST205), Supabase itself responded, meaning connection works!
      if (!testErr || testErr.code === 'PGRST205' || testErr.code === '42P01') {
        connected = true;
        message = testErr
          ? `Connected to Supabase (${config.projectId}). Schema initialization required.`
          : `Connected and synchronized with Supabase (${config.projectId}).`;
      } else {
        connected = false;
        let errMsg = testErr.message || testErr.code || 'Unknown connection error';
        if (typeof errMsg === 'string') {
          if (
            errMsg.toLowerCase().includes('gateway timeout') ||
            errMsg.toLowerCase().includes('timeout') ||
            errMsg.toLowerCase().includes('abort') ||
            (testErr as any)?.status === 504 ||
            (testErr as any)?.status === 502
          ) {
            errMsg = 'Supabase Cloud standby mode (Gateway Timeout 504). Resilient local persistence active.';
          } else if (errMsg.includes('<!DOCTYPE') || errMsg.includes('<html')) {
            errMsg = `Supabase returned an HTML response instead of JSON. Ensure SUPABASE_URL points to https://${config.projectId}.supabase.co`;
          }
        }
        message = errMsg;
      }

      if (!connected) {
        // Fast fallback: mark tables without firing 11 failing network queries
        for (const table of SUPABASE_TABLES) {
          tableStatuses[table] = {
            name: table,
            exists: false,
            count: null,
            error: 'Supabase offline or in standby mode'
          };
        }
      } else {
        // Check each target table status in parallel with Promise.allSettled
        await Promise.allSettled(
          SUPABASE_TABLES.map(async (table) => {
            try {
              const { count, error } = await client.from(table).select('*', { count: 'exact', head: true });
              if (!error) {
                tableStatuses[table] = {
                  name: table,
                  exists: true,
                  count: count || 0
                };
              } else if (error.code === 'PGRST205' || error.code === '42P01') {
                tableStatuses[table] = {
                  name: table,
                  exists: false,
                  count: null,
                  error: 'Table not created in Supabase yet'
                };
              } else {
                tableStatuses[table] = {
                  name: table,
                  exists: false,
                  count: null,
                  error: error.message
                };
              }
            } catch (e: any) {
              tableStatuses[table] = {
                name: table,
                exists: false,
                count: null,
                error: e?.message || 'Error checking table'
              };
            }
          })
        );
      }

      const result: SupabaseConnectionStatus = {
        connected,
        url: config.url,
        projectId: config.projectId,
        latencyMs: connected ? latencyMs : Math.min(latencyMs, 3500),
        tables: tableStatuses,
        message,
        sqlSchema: SUPABASE_SQL_SCHEMA
      };

      this.cachedStatus = result;
      this.lastCheckTimestamp = Date.now();
      return result;
    } catch (err: any) {
      const rawMsg = err?.message || 'Failed to establish connection to Supabase';
      const friendlyMsg = rawMsg.toLowerCase().includes('timeout') || rawMsg.toLowerCase().includes('abort')
        ? 'Supabase Cloud standby mode (Gateway Timeout 504). Resilient local persistence active.'
        : rawMsg;

      for (const table of SUPABASE_TABLES) {
        tableStatuses[table] = {
          name: table,
          exists: false,
          count: null,
          error: 'Standby mode'
        };
      }

      const result: SupabaseConnectionStatus = {
        connected: false,
        url: config.url,
        projectId: config.projectId,
        latencyMs: Math.min(Date.now() - start, 3500),
        tables: tableStatuses,
        message: friendlyMsg,
        sqlSchema: SUPABASE_SQL_SCHEMA
      };

      this.cachedStatus = result;
      this.lastCheckTimestamp = Date.now();
      return result;
    }
  }

  /**
   * Synchronize an item or collection to a Supabase table with graceful fallback
   */
  public static async safeUpsert(table: string, data: any | any[]): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      if (this.cachedStatus && !this.cachedStatus.connected && (Date.now() - this.lastCheckTimestamp < this.STATUS_CACHE_TTL)) {
        return { success: false, error: 'Supabase in standby mode; synchronized locally' };
      }
      const client = this.getClient();
      const payload = Array.isArray(data) ? data : [data];
      if (payload.length === 0) return { success: true, data: [] };

      const { data: result, error } = await client.from(table).upsert(payload);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to upsert to Supabase' };
    }
  }

  /**
   * Synchronize an item insertion to Supabase table
   */
  public static async safeInsert(table: string, data: any): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      if (this.cachedStatus && !this.cachedStatus.connected && (Date.now() - this.lastCheckTimestamp < this.STATUS_CACHE_TTL)) {
        return { success: false, error: 'Supabase in standby mode; stored locally' };
      }
      const client = this.getClient();
      const { data: result, error } = await client.from(table).insert(data).select();
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: result };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to insert to Supabase' };
    }
  }

  /**
   * Delete an item from Supabase table
   */
  public static async safeDelete(table: string, matchColumn: string, matchValue: any): Promise<{ success: boolean; error?: string }> {
    try {
      if (this.cachedStatus && !this.cachedStatus.connected && (Date.now() - this.lastCheckTimestamp < this.STATUS_CACHE_TTL)) {
        return { success: false, error: 'Supabase in standby mode; deleted locally' };
      }
      const client = this.getClient();
      const { error } = await client.from(table).delete().eq(matchColumn, matchValue);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to delete from Supabase' };
    }
  }

  /**
   * Fetch rows from a Supabase table
   */
  public static async safeSelect(table: string, query?: { column?: string; value?: any; limit?: number; order?: string }): Promise<{ success: boolean; data?: any[]; error?: string }> {
    try {
      if (this.cachedStatus && !this.cachedStatus.connected && (Date.now() - this.lastCheckTimestamp < this.STATUS_CACHE_TTL)) {
        return { success: false, error: 'Supabase in standby mode; using local store' };
      }
      const client = this.getClient();
      let req = client.from(table).select('*');
      if (query?.column && query?.value !== undefined) {
        req = req.eq(query.column, query.value);
      }
      if (query?.order) {
        req = req.order(query.order, { ascending: false });
      }
      if (query?.limit) {
        req = req.limit(query.limit);
      }
      const { data, error } = await req;
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data: data || [] };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to fetch from Supabase' };
    }
  }

  /**
   * Supabase Auth: Sign in user with email and password
   */
  public static async signInWithSupabase(email: string, password: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const client = this.getClient();
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to authenticate with Supabase' };
    }
  }

  /**
   * Supabase Auth: Sign up new user with email, password and metadata
   */
  public static async signUpWithSupabase(email: string, password: string, metadata: Record<string, any> = {}): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const client = this.getClient();
      const { data, error } = await client.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to register with Supabase' };
    }
  }

  /**
   * Supabase Auth: Sign out
   */
  public static async signOutSupabase(): Promise<{ success: boolean; error?: string }> {
    try {
      const client = this.getClient();
      const { error } = await client.auth.signOut();
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to sign out from Supabase' };
    }
  }

  /**
   * Supabase Auth: Get authenticated user from token
   */
  public static async getSupabaseUser(jwtToken: string): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const client = this.getClient();
      const { data: { user }, error } = await client.auth.getUser(jwtToken);
      if (error || !user) {
        return { success: false, error: error?.message || 'Invalid or expired Supabase token' };
      }
      return { success: true, user };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to retrieve Supabase user' };
    }
  }
}
