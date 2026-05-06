import type { DatesFormData, PersonalFormData, PaymentFormData } from './schemas/booking';

export type BookingStep = 'dates' | 'personal' | 'payment' | 'confirmation';

export interface BookingData {
  dates?: DatesFormData;
  personal?: PersonalFormData;
  payment?: PaymentFormData;
}
