import { BaseVehicle } from '../../../core/abstract/BaseVehicle';
import { VehicleType, SlotType } from '../../../core/types/enums';

export class Truck extends BaseVehicle {
  constructor(licensePlate: string, make?: string, model?: string, color?: string) {
    super(licensePlate, VehicleType.TRUCK, make, model, color);
  }

  getCompatibleSlotTypes(): SlotType[] {
    return [SlotType.LARGE];
  }

  getSizeMultiplier(): number {
    return 2.0;
  }
}
