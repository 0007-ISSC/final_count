/**
 * HealthGPT Autonomous Appointment Booking Service
 * 
 * Enables the AI Doctor and Autonomous Agent to genuinely schedule, confirm,
 * and persist appointments with real clinical specialists across India.
 */

export interface BookingRequestParams {
  doctorId?: number;
  doctorQuery?: string;
  specialty?: string;
  patientName?: string;
  patientPhone?: string;
  patientAge?: number;
  patientGender?: string;
  date?: string;
  timeSlot?: string;
  mode?: 'video' | 'in_clinic' | 'audio';
  symptoms?: string;
  userId?: number;
}

export interface BookingExecutionResult {
  success: boolean;
  appointment?: any;
  doctor?: any;
  responseText: string;
  appAction?: {
    type: string;
    target: string;
    label: string;
    appointment: any;
    doctor: any;
  };
  error?: string;
}

type BookingHandlerFn = (params: BookingRequestParams) => Promise<BookingExecutionResult> | BookingExecutionResult;

let globalBookingHandler: BookingHandlerFn | null = null;

export function registerBookingHandler(handler: BookingHandlerFn) {
  globalBookingHandler = handler;
}

/**
 * Parses natural language user query to extract booking parameters
 */
export function parseBookingIntent(query: string): BookingRequestParams {
  const q = query.toLowerCase();
  const params: BookingRequestParams = {
    patientName: 'Demo User',
    patientPhone: '+91 98765 43210',
    mode: 'video'
  };

  // 1. Doctor name detection
  if (q.includes('sharma')) params.doctorQuery = 'Sharma';
  else if (q.includes('nair')) params.doctorQuery = 'Nair';
  else if (q.includes('bansal')) params.doctorQuery = 'Bansal';
  else if (q.includes('swaminathan')) params.doctorQuery = 'Swaminathan';
  else if (q.includes('verma')) params.doctorQuery = 'Verma';
  else if (q.includes('narang')) params.doctorQuery = 'Narang';
  else if (q.includes('joshi')) params.doctorQuery = 'Joshi';
  else if (q.includes('reddy')) params.doctorQuery = 'Reddy';
  else if (q.includes('kulkarni')) params.doctorQuery = 'Kulkarni';

  // 2. Specialty detection
  if (q.includes('cardio') || q.includes('heart') || q.includes('chest pain') || q.includes('bp') || q.includes('hypertension')) {
    params.specialty = 'Cardiologist';
  } else if (q.includes('skin') || q.includes('derma') || q.includes('rash') || q.includes('acne')) {
    params.specialty = 'Dermatologist & Cosmetologist';
  } else if (q.includes('lung') || q.includes('breath') || q.includes('pulmo') || q.includes('cough') || q.includes('asthma')) {
    params.specialty = 'Pulmonologist & Respiratory Care';
  } else if (q.includes('nerve') || q.includes('neuro') || q.includes('stroke') || q.includes('brain') || q.includes('seizure')) {
    params.specialty = 'Neurologist & Stroke Specialist';
  } else if (q.includes('bone') || q.includes('ortho') || q.includes('joint') || q.includes('knee') || q.includes('fracture')) {
    params.specialty = 'Orthopedic & Joint Surgeon';
  } else if (q.includes('gynae') || q.includes('period') || q.includes('women') || q.includes('pregnancy') || q.includes('pcos')) {
    params.specialty = 'Obstetrician & Gynecologist';
  } else if (q.includes('sugar') || q.includes('diabet') || q.includes('endocrine') || q.includes('thyroid')) {
    params.specialty = 'Diabetologist & Endocrinologist';
  }

  // 3. Date detection
  const today = new Date();
  if (q.includes('today')) {
    params.date = today.toISOString().split('T')[0];
  } else {
    // Default to tomorrow for clinical bookings
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    params.date = tomorrow.toISOString().split('T')[0];
  }

  // 4. Time slot detection
  const timeMatch = q.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);
  if (timeMatch) {
    let slot = timeMatch[1].toUpperCase();
    if (!slot.includes(':')) {
      slot = slot.replace(/(AM|PM)/, ':00 $1');
    }
    params.timeSlot = slot;
  } else {
    params.timeSlot = '10:30 AM';
  }

  // 5. Mode detection
  if (q.includes('clinic') || q.includes('in person') || q.includes('hospital') || q.includes('offline')) {
    params.mode = 'in_clinic';
  } else {
    params.mode = 'video';
  }

  params.symptoms = query;

  return params;
}

/**
 * Autonomous execution of doctor appointment booking
 */
export async function executeDoctorBooking(
  queryOrParams: string | BookingRequestParams
): Promise<BookingExecutionResult> {
  const params = typeof queryOrParams === 'string'
    ? parseBookingIntent(queryOrParams)
    : queryOrParams;

  if (globalBookingHandler) {
    try {
      return await globalBookingHandler(params);
    } catch (err: any) {
      console.error('Error executing booking handler:', err);
    }
  }

  return {
    success: false,
    responseText: 'Appointment booking engine is currently initializing. Please try again or open Connect Indian Doctors directly.',
    error: 'Booking handler not registered'
  };
}
