import { User, Prisma } from '@prisma/client';
import { BaseRepository } from '../../core/abstract/BaseRepository';

export class UserRepository extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
  protected entityName = 'User';

  protected getModelDelegate() {
    return this.prisma.user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAllActive(): Promise<User[]> {
    return this.prisma.user.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } });
  }
}
