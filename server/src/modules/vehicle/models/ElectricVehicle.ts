import { BaseVehicle } from '../../../core/abstract/BaseVehicle';
import { VehicleType, SlotType } from '../../../core/types/enums';

export class ElectricVehicle extends BaseVehicle {
  constructor(licensePlate: string, make?: string, model?: string, color?: string) {
    super(licensePlate, VehicleType.ELECTRIC, make, model, color);
  }

  getCompatibleSlotTypes(): SlotType[] {
    return [SlotType.ELECTRIC_CHARGING, SlotType.REGULAR, SlotType.LARGE];
  }

  getSizeMultiplier(): number {
    return 1.2;
  }
}
