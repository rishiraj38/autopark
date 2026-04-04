import { Role } from '../../core/types/enums';
import { NotFoundError } from '../../core/errors/NotFoundError';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';
import { UserResponseDTO, UpdateUserDTO } from './user.dto';

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async getProfile(userId: string): Promise<UserResponseDTO> {
    const user = await this.userRepo.findByIdOrThrow(userId);
    return UserMapper.toDTO(user);
  }

  async updateProfile(userId: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this.userRepo.update(userId, data);
    return UserMapper.toDTO(user);
  }

  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepo.findAllActive();
    return UserMapper.toDTOList(users);
  }

  async getUserById(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepo.findByIdOrThrow(id);
    return UserMapper.toDTO(user);
  }

  async updateRole(id: string, role: Role): Promise<UserResponseDTO> {
    const user = await this.userRepo.update(id, { role });
    return UserMapper.toDTO(user);
  }

  async deactivateUser(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundError('User', id);
    await this.userRepo.update(id, { isActive: false });
  }
}
