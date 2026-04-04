import { ParkingSlot, ParkingFloor } from '@prisma/client';
import { ParkingSlotResponseDTO, ParkingFloorResponseDTO } from './parking.dto';

type SlotWithFloor = ParkingSlot & { floor?: ParkingFloor };

export class ParkingMapper {
  static slotToDTO(slot: SlotWithFloor): ParkingSlotResponseDTO {
    return {
      id: slot.id,
      slotNumber: slot.slotNumber,
      type: slot.type,
      status: slot.status,
      floorId: slot.floorId,
      floorName: slot.floor?.name,
      floorLevel: slot.floor?.level,
      pricePerHour: Number(slot.pricePerHour),
      distanceFromEntry: slot.distanceFromEntry,
      createdAt: slot.createdAt.toISOString(),
    };
  }

  static slotToDTOList(slots: SlotWithFloor[]): ParkingSlotResponseDTO[] {
    return slots.map(ParkingMapper.slotToDTO);
  }

  static floorToDTO(floor: ParkingFloor & { _count?: { slots: number } }, availableCount?: number): ParkingFloorResponseDTO {
    return {
      id: floor.id,
      name: floor.name,
      level: floor.level,
      capacity: floor.capacity,
      slotsCount: floor._count?.slots,
      availableCount,
    };
  }
}
