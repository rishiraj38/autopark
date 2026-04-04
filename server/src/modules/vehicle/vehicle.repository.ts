import { Vehicle, Prisma } from '@prisma/client';
import { BaseRepository } from '../../core/abstract/BaseRepository';

export class VehicleRepository extends BaseRepository<Vehicle, Prisma.VehicleCreateInput, Prisma.VehicleUpdateInput> {
  protected entityName = 'Vehicle';

  protected getModelDelegate() {
    return this.prisma.vehicle;
  }

  async findByOwnerId(ownerId: string): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany({
      where: { ownerId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByLicensePlate(licensePlate: string): Promise<Vehicle | null> {
    return this.prisma.vehicle.findUnique({ where: { licensePlate } });
  }
}
