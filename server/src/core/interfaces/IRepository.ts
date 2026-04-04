/**
 * Interface Segregation Principle: Generic CRUD interface.
 * Only defines the essential operations — specific repositories
 * add their own methods without bloating this interface.
 */
export interface IRepository<T, CreateDTO, UpdateDTO> {
  findAll(filters?: Record<string, unknown>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: CreateDTO): Promise<T>;
  update(id: string, data: UpdateDTO): Promise<T>;
  delete(id: string): Promise<void>;
  count(filters?: Record<string, unknown>): Promise<number>;
}
