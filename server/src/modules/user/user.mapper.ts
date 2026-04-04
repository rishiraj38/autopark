import { User } from '@prisma/client';
import { UserResponseDTO } from './user.dto';

export class UserMapper {
  static toDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString(),
    };
  }

  static toDTOList(users: User[]): UserResponseDTO[] {
    return users.map(UserMapper.toDTO);
  }
}
