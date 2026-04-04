import { z } from 'zod';

export const createFloorSchema = z.object({
  name: z.string().min(1, 'Floor name is required'),
  level: z.number().int(),
  capacity: z.number().int().positive(),
});

export const createSlotSchema = z.object({
  slotNumber: z.string().min(1, 'Slot number is required'),
  type: z.enum(['COMPACT', 'REGULAR', 'LARGE', 'HANDICAPPED', 'ELECTRIC_CHARGING']),
  floorId: z.string().uuid(),
  pricePerHour: z.number().positive(),
  distanceFromEntry: z.number().int().min(0).optional(),
});

export const updateSlotSchema = z.object({
  type: z.enum(['COMPACT', 'REGULAR', 'LARGE', 'HANDICAPPED', 'ELECTRIC_CHARGING']).optional(),
  pricePerHour: z.number().positive().optional(),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE']).optional(),
  distanceFromEntry: z.number().int().min(0).optional(),
});

export const allocateSlotSchema = z.object({
  vehicleType: z.enum(['CAR', 'MOTORCYCLE', 'TRUCK', 'ELECTRIC']),
  strategy: z.enum(['nearest', 'cheapest', 'priority']).optional().default('nearest'),
});

export type CreateFloorDTO = z.infer<typeof createFloorSchema>;
export type CreateSlotDTO = z.infer<typeof createSlotSchema>;
export type UpdateSlotDTO = z.infer<typeof updateSlotSchema>;
export type AllocateSlotDTO = z.infer<typeof allocateSlotSchema>;

export interface ParkingSlotResponseDTO {
  id: string;
  slotNumber: string;
  type: string;
  status: string;
  floorId: string;
  floorName?: string;
  floorLevel?: number;
  pricePerHour: number;
  distanceFromEntry: number;
  createdAt: string;
}

export interface ParkingFloorResponseDTO {
  id: string;
  name: string;
  level: number;
  capacity: number;
  slotsCount?: number;
  availableCount?: number;
}
