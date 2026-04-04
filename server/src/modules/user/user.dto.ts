import { z } from 'zod';

export const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
});

export const updateRoleSchema = z.object({
  role: z.enum(['ADMIN', 'USER']),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type UpdateRoleDTO = z.infer<typeof updateRoleSchema>;

export interface UserResponseDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
}
