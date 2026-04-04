import { z } from 'zod';

export const createVehicleSchema = z.object({
  licensePlate: z.string().min(1, 'License plate is required'),
  type: z.enum(['CAR', 'MOTORCYCLE', 'TRUCK', 'ELECTRIC']),
  make: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
});

export const updateVehicleSchema = z.object({
  make: z.string().optional(),
  model: z.string().optional(),
  color: z.string().optional(),
});

export type CreateVehicleDTO = z.infer<typeof createVehicleSchema>;
export type UpdateVehicleDTO = z.infer<typeof updateVehicleSchema>;

export interface VehicleResponseDTO {
  id: string;
  licensePlate: string;
  type: string;
  make: string | null;
  model: string | null;
  color: string | null;
  ownerId: string;
  compatibleSlotTypes: string[];
  sizeMultiplier: number;
  createdAt: string;
}
