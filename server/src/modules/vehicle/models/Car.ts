import { BaseVehicle } from '../../../core/abstract/BaseVehicle';
import { VehicleType, SlotType } from '../../../core/types/enums';

export class Car extends BaseVehicle {
  constructor(licensePlate: string, make?: string, model?: string, color?: string) {
    super(licensePlate, VehicleType.CAR, make, model, color);
  }

  getCompatibleSlotTypes(): SlotType[] {
    return [SlotType.REGULAR, SlotType.LARGE];
  }

  getSizeMultiplier(): number {
    return 1.0;
  }
}
