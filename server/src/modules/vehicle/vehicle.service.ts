import { VehicleType } from '../../core/types/enums';
import { ConflictError } from '../../core/errors/ConflictError';
import { VehicleRepository } from './vehicle.repository';
import { VehicleMapper } from './vehicle.mapper';
import { VehicleFactory } from './vehicle.factory';
import { VehicleResponseDTO, CreateVehicleDTO, UpdateVehicleDTO } from './vehicle.dto';

export class VehicleService {
  private vehicleRepo: VehicleRepository;

  constructor() {
    this.vehicleRepo = new VehicleRepository();
  }

  async getUserVehicles(userId: string): Promise<VehicleResponseDTO[]> {
    const vehicles = await this.vehicleRepo.findByOwnerId(userId);
    return VehicleMapper.toDTOList(vehicles);
  }

  async createVehicle(userId: string, data: CreateVehicleDTO): Promise<VehicleResponseDTO> {
    // Use factory to validate vehicle type and get compatible slots
    VehicleFactory.create(data.type as VehicleType, data.licensePlate);

    const existing = await this.vehicleRepo.findByLicensePlate(data.licensePlate);
    if (existing) {
      throw new ConflictError('Vehicle with this license plate already exists');
    }

    const vehicle = await this.vehicleRepo.create({
      licensePlate: data.licensePlate,
      type: data.type as VehicleType,
      make: data.make,
      model: data.model,
      color: data.color,
      owner: { connect: { id: userId } },
    });

    return VehicleMapper.toDTO(vehicle);
  }

  async getVehicleById(id: string): Promise<VehicleResponseDTO> {
    const vehicle = await this.vehicleRepo.findByIdOrThrow(id);
    return VehicleMapper.toDTO(vehicle);
  }

  async updateVehicle(id: string, data: UpdateVehicleDTO): Promise<VehicleResponseDTO> {
    const vehicle = await this.vehicleRepo.update(id, data);
    return VehicleMapper.toDTO(vehicle);
  }

  async deleteVehicle(id: string): Promise<void> {
    await this.vehicleRepo.update(id, { isActive: false });
  }
}
