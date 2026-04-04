import { z } from 'zod';

export const createBookingSchema = z.object({
  vehicleId: z.string().uuid(),
  slotId: z.string().uuid().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  strategy: z.enum(['nearest', 'cheapest', 'priority']).optional().default('nearest'),
});

export const cancelBookingSchema = z.object({
  reason: z.string().optional(),
});

export type CreateBookingDTO = z.infer<typeof createBookingSchema>;

export interface BookingResponseDTO {
  id: string;
  userId: string;
  vehicleId: string;
  vehicleLicensePlate: string;
  vehicleType: string;
  slotId: string;
  slotNumber: string;
  status: string;
  startTime: string;
  endTime: string;
  actualEntry: string | null;
  actualExit: string | null;
  totalAmount: number | null;
  createdAt: string;
}
