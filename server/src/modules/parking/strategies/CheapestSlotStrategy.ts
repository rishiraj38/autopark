import { IParkingStrategy, AvailableSlot } from '../../../core/interfaces/IParkingStrategy';

export class CheapestSlotStrategy implements IParkingStrategy {
  readonly name = 'cheapest';

  allocate(availableSlots: AvailableSlot[]): AvailableSlot | null {
    if (availableSlots.length === 0) return null;
    return availableSlots.reduce((cheapest, slot) =>
      slot.pricePerHour < cheapest.pricePerHour ? slot : cheapest
    );
  }
}
