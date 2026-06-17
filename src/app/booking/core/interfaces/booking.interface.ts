export type BookingStatus = 'draft' | 'pending' | 'hold' | 'booked' | 'in_progress' | 'done' | 'cancelled' | 'expired';
export type PaymentStatus = 'unpaid' | 'partial' | 'paid' | 'external';
export type PaymentMethod = 'card' | 'cash' | 'revolut' | 'bank' | 'other';

/** One payment against a booking. A booking can have many (deposit + partials + final). */
export interface Payment {
  id: string;
  amount: number;
  method: PaymentMethod;
  note: string | null;
  status: string;            // 'completed' | 'pending' | 'refunded'
  paid_at: string | null;
  created_at: string;
  stripe_payment_intent_id: string | null;
}

export interface BookingSummary {
  id: string;
  booking_ref: string;
  title: string;
  start_at: string;
  end_at: string;
  price_total: number;
  price_expenses: number;
  price_revenue: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  total_paid: number;
  client_name: string | null;
  client_email: string | null;
  service_name: string | null;
  staff_name: string | null;
  is_external: boolean;
  google_event_id: string | null;
}

/** Raw editable columns of a booking — used by the admin edit form. */
export interface EditableBooking {
  id: string;
  org_id: string;
  booking_ref: string;
  staff_id: string;
  service_id: string | null;
  client_id: string | null;
  title: string;
  description: string | null;   // client-facing work description (shown on the pay page + invoice)
  start_at: string;
  end_at: string;
  price_total: number;
  location: string | null;
  notes: string | null;
  status: BookingStatus;
  allow_card: boolean;
  allow_inperson: boolean;
  deposit_percent: number | null;   // per-booking override; null = inherit org default
  deposit_allowed: boolean | null;  // per-booking override; null = inherit org default
  needs_production: boolean;         // on the Work board (post-production) when true
}

/** A worker's occupied time range — feeds the admin availability picker's busy slots. */
export interface WorkerBusy {
  id: string;
  start_at: string;
  end_at: string;
  title: string;
  status: BookingStatus;
  clientName: string | null;
}

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  vat_number: string | null;
  billing_address: string | null;
  notes: string | null;
  created_at: string;
}
