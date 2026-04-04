import { ParkingSlot, ParkingFloor, Prisma, SlotStatus, SlotType } from '@prisma/client';
import { BaseRepository } from '../../core/abstract/BaseRepository';
import { AvailableSlot } from '../../core/interfaces/IParkingStrategy';

export class ParkingSlotRepository extends BaseRepository<ParkingSlot, Prisma.ParkingSlotCreateInput, Prisma.ParkingSlotUpdateInput> {
  protected entityName = 'ParkingSlot';

  protected getModelDelegate() {
    return this.prisma.parkingSlot;
  }

  async findAllWithFloor(filters?: { status?: SlotStatus; type?: SlotType; floorId?: string }): Promise<(ParkingSlot & { floor: ParkingFloor })[]> {
    return this.prisma.parkingSlot.findMany({
      where: {
        isActive: true,
        ...filters,
      },
      include: { floor: true },
      orderBy: { slotNumber: 'asc' },
    });
  }

  async findAvailableByTypes(types: SlotType[]): Promise<AvailableSlot[]> {
    const slots = await this.prisma.parkingSlot.findMany({
      where: {
        status: SlotStatus.AVAILABLE,
        type: { in: types },
        isActive: true,
      },
      include: { floor: true },
    });

    return slots.map((slot) => ({
      id: slot.id,
      slotNumber: slot.slotNumber,
      type: slot.type,
      pricePerHour: Number(slot.pricePerHour),
      distanceFromEntry: slot.distanceFromEntry,
      floorLevel: slot.floor.level,
    }));
  }

  async updateStatus(id: string, status: SlotStatus): Promise<ParkingSlot> {
    return this.prisma.parkingSlot.update({
      where: { id },
      data: { status },
    });
  }
}

export class ParkingFloorRepository extends BaseRepository<ParkingFloor, Prisma.ParkingFloorCreateInput, Prisma.ParkingFloorUpdateInput> {
  protected entityName = 'ParkingFloor';

  protected getModelDelegate() {
    return this.prisma.parkingFloor;
  }

  async findAllWithCounts(): Promise<(ParkingFloor & { _count: { slots: number } })[]> {
    return this.prisma.parkingFloor.findMany({
      include: { _count: { select: { slots: true } } },
      orderBy: { level: 'asc' },
    });
  }
}
