import { PrismaClient } from '@prisma/client';
import { DatabaseConnection } from '../../config/database';
import { IRepository } from '../interfaces/IRepository';
import { NotFoundError } from '../errors/NotFoundError';

/**
 * Abstract Base Repository — demonstrates:
 * - Abstraction: Cannot be instantiated directly
 * - Inheritance: All repositories extend this class
 * - Encapsulation: Prisma client is protected, not public
 * - Generics: Type-safe CRUD for any entity
 * - Template Method: getModelDelegate() is deferred to subclasses
 */
export abstract class BaseRepository<T, CreateDTO, UpdateDTO>
  implements IRepository<T, CreateDTO, UpdateDTO>
{
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = DatabaseConnection.getInstance().getClient();
  }

  protected abstract getModelDelegate(): any;
  protected abstract entityName: string;

  async findAll(filters?: Record<string, unknown>): Promise<T[]> {
    return this.getModelDelegate().findMany({ where: filters });
  }

  async findById(id: string): Promise<T | null> {
    return this.getModelDelegate().findUnique({ where: { id } });
  }

  async findByIdOrThrow(id: string): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundError(this.entityName, id);
    }
    return entity;
  }

  async create(data: CreateDTO): Promise<T> {
    return this.getModelDelegate().create({ data });
  }

  async update(id: string, data: UpdateDTO): Promise<T> {
    await this.findByIdOrThrow(id);
    return this.getModelDelegate().update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.findByIdOrThrow(id);
    await this.getModelDelegate().delete({ where: { id } });
  }

  async count(filters?: Record<string, unknown>): Promise<number> {
    return this.getModelDelegate().count({ where: filters });
  }
}
