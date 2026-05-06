import { z } from 'zod';

export const datesSchema = z
  .object({
    checkIn: z.string().min(1, 'Check-in date is required'),
    checkOut: z.string().min(1, 'Check-out date is required'),
    guests: z.number().min(1, 'At least 1 guest required').max(16),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: 'Check-out must be after check-in',
    path: ['checkOut'],
  });

export const personalSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is required'),
});

export const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number must be 16 digits').max(16),
  expiry: z.string().min(1, 'Expiry date is required'),
  cvv: z.string().min(3, 'CVV must be 3 digits').max(4),
  nameOnCard: z.string().min(1, 'Name on card is required'),
});

export type DatesFormData = z.infer<typeof datesSchema>;
export type PersonalFormData = z.infer<typeof personalSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
