import { Booking, Vehicle, ParkingSlot } from '@prisma/client';
import { BookingResponseDTO } from './booking.dto';

type BookingWithRelations = Booking & {
  vehicle: Vehicle;
  slot: ParkingSlot;
};

export class BookingMapper {
  static toDTO(booking: BookingWithRelations): BookingResponseDTO {
    return {
      id: booking.id,
      userId: booking.userId,
      vehicleId: booking.vehicleId,
      vehicleLicensePlate: booking.vehicle.licensePlate,
      vehicleType: booking.vehicle.type,
      slotId: booking.slotId,
      slotNumber: booking.slot.slotNumber,
      status: booking.status,
      startTime: booking.startTime.toISOString(),
      endTime: booking.endTime.toISOString(),
      actualEntry: booking.actualEntry?.toISOString() ?? null,
      actualExit: booking.actualExit?.toISOString() ?? null,
      totalAmount: booking.totalAmount ? Number(booking.totalAmount) : null,
      createdAt: booking.createdAt.toISOString(),
    };
  }

  static toDTOList(bookings: BookingWithRelations[]): BookingResponseDTO[] {
    return bookings.map(BookingMapper.toDTO);
  }
}
