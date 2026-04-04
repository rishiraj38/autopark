import { IParkingStrategy, AvailableSlot } from '../../../core/interfaces/IParkingStrategy';

/**
 * Strategy Pattern: Allocates the slot nearest to the entrance.
 * Liskov Substitution: Can replace any IParkingStrategy without affecting ParkingService.
 */
export class NearestSlotStrategy implements IParkingStrategy {
  readonly name = 'nearest';

  allocate(availableSlots: AvailableSlot[]): AvailableSlot | null {
    if (availableSlots.length === 0) return null;
    return availableSlots.reduce((nearest, slot) =>
      slot.distanceFromEntry < nearest.distanceFromEntry ? slot : nearest
    );
  }
}
