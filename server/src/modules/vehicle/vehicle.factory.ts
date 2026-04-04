import { VehicleType } from '../../core/types/enums';
import { BaseVehicle } from '../../core/abstract/BaseVehicle';
import { Car } from './models/Car';
import { Motorcycle } from './models/Motorcycle';
import { Truck } from './models/Truck';
import { ElectricVehicle } from './models/ElectricVehicle';
import { ValidationError } from '../../core/errors/ValidationError';

/**
 * Factory Pattern: Creates the correct vehicle subclass based on type.
 * Open/Closed: Adding a new vehicle type = new subclass + one case here.
 * Polymorphism: Returns BaseVehicle; caller doesn't need to know the concrete type.
 */
export class VehicleFactory {
  static create(
    type: VehicleType,
    licensePlate: string,
    make?: string,
    model?: string,
    color?: string
  ): BaseVehicle {
    switch (type) {
      case VehicleType.CAR:
        return new Car(licensePlate, make, model, color);
      case VehicleType.MOTORCYCLE:
        return new Motorcycle(licensePlate, make, model, color);
      case VehicleType.TRUCK:
        return new Truck(licensePlate, make, model, color);
      case VehicleType.ELECTRIC:
        return new ElectricVehicle(licensePlate, make, model, color);
      default:
        throw new ValidationError(`Unknown vehicle type: ${type}`);
    }
  }
}
