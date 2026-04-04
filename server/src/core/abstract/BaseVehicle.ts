import { VehicleType, SlotType } from '../types/enums';

/**
 * Abstract Base Vehicle — demonstrates:
 * - Abstraction: Cannot be instantiated; defines contract via abstract methods
 * - Inheritance: Car, Motorcycle, Truck, ElectricVehicle extend this
 * - Polymorphism: Each subclass provides its own getCompatibleSlotTypes() and getSizeMultiplier()
 * - Encapsulation: readonly properties prevent modification after construction
 */
export abstract class BaseVehicle {
  public readonly licensePlate: string;
  public readonly type: VehicleType;
  public readonly make?: string;
  public readonly model?: string;
  public readonly color?: string;

  constructor(
    licensePlate: string,
    type: VehicleType,
    make?: string,
    model?: string,
    color?: string
  ) {
    this.licensePlate = licensePlate;
    this.type = type;
    this.make = make;
    this.model = model;
    this.color = color;
  }

  abstract getCompatibleSlotTypes(): SlotType[];

  abstract getSizeMultiplier(): number;

  canFitInSlot(slotType: SlotType): boolean {
    return this.getCompatibleSlotTypes().includes(slotType);
  }

  calculatePrice(basePricePerHour: number, hours: number): number {
    return basePricePerHour * this.getSizeMultiplier() * hours;
  }
}
