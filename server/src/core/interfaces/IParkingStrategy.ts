import { SlotType } from '../types/enums';

export interface AvailableSlot {
  id: string;
  slotNumber: string;
  type: SlotType;
  pricePerHour: number;
  distanceFromEntry: number;
  floorLevel: number;
}

/**
 * Strategy Pattern Interface.
 * Interface Segregation: Single method — allocate().
 * Open/Closed: New strategies implement this without modifying existing code.
 * Dependency Inversion: ParkingService depends on this interface, not concrete strategies.
 */
export interface IParkingStrategy {
  readonly name: string;
  allocate(availableSlots: AvailableSlot[]): AvailableSlot | null;
}
