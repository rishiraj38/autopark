import { IParkingStrategy, AvailableSlot } from '../../../core/interfaces/IParkingStrategy';

/**
 * Combines distance from entry and floor level into a weighted priority score.
 * Lower score = better slot.
 */
export class PrioritySlotStrategy implements IParkingStrategy {
  readonly name = 'priority';

  allocate(availableSlots: AvailableSlot[]): AvailableSlot | null {
    if (availableSlots.length === 0) return null;
    return availableSlots.reduce((best, slot) => {
      const bestScore = this.calculateScore(best);
      const slotScore = this.calculateScore(slot);
      return slotScore < bestScore ? slot : best;
    });
  }

  private calculateScore(slot: AvailableSlot): number {
    return slot.distanceFromEntry + Math.abs(slot.floorLevel) * 10;
  }
}
