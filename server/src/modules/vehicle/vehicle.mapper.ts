import { Vehicle } from '@prisma/client';
import { VehicleFactory } from './vehicle.factory';
import { VehicleType } from '../../core/types/enums';
import { VehicleResponseDTO } from './vehicle.dto';

export class VehicleMapper {
  static toDTO(vehicle: Vehicle): VehicleResponseDTO {
    const vehicleObj = VehicleFactory.create(
      vehicle.type as VehicleType,
      vehicle.licensePlate,
      vehicle.make ?? undefined,
      vehicle.model ?? undefined,
      vehicle.color ?? undefined
    );

    return {
      id: vehicle.id,
      licensePlate: vehicle.licensePlate,
      type: vehicle.type,
      make: vehicle.make,
      model: vehicle.model,
      color: vehicle.color,
      ownerId: vehicle.ownerId,
      compatibleSlotTypes: vehicleObj.getCompatibleSlotTypes(),
      sizeMultiplier: vehicleObj.getSizeMultiplier(),
      createdAt: vehicle.createdAt.toISOString(),
    };
  }

  static toDTOList(vehicles: Vehicle[]): VehicleResponseDTO[] {
    return vehicles.map(VehicleMapper.toDTO);
  }
}
