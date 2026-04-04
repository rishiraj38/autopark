import { z } from 'zod';

export const createPaymentSchema = z.object({
  bookingId: z.string().uuid(),
  method: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'WALLET']),
});

export type CreatePaymentDTO = z.infer<typeof createPaymentSchema>;

export interface PaymentResponseDTO {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  method: string;
  status: string;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
}
