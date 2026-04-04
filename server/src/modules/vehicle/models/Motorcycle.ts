import { BaseVehicle } from '../../../core/abstract/BaseVehicle';
import { VehicleType, SlotType } from '../../../core/types/enums';

export class Motorcycle extends BaseVehicle {
  constructor(licensePlate: string, make?: string, model?: string, color?: string) {
    super(licensePlate, VehicleType.MOTORCYCLE, make, model, color);
  }

  getCompatibleSlotTypes(): SlotType[] {
    return [SlotType.COMPACT, SlotType.REGULAR, SlotType.LARGE];
  }

  getSizeMultiplier(): number {
    return 0.5;
  }
}
