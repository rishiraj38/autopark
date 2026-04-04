import { DatabaseConnection } from '../../config/database';
import { SlotStatus, BookingStatus } from '../../core/types/enums';

export class ReportService {
  private prisma = DatabaseConnection.getInstance().getClient();

  async getOccupancyReport(): Promise<{
    totalSlots: number;
    occupied: number;
    available: number;
    reserved: number;
    maintenance: number;
    occupancyRate: number;
  }> {
    const [total, occupied, available, reserved, maintenance] = await Promise.all([
      this.prisma.parkingSlot.count({ where: { isActive: true } }),
      this.prisma.parkingSlot.count({ where: { status: SlotStatus.OCCUPIED, isActive: true } }),
      this.prisma.parkingSlot.count({ where: { status: SlotStatus.AVAILABLE, isActive: true } }),
      this.prisma.parkingSlot.count({ where: { status: SlotStatus.RESERVED, isActive: true } }),
      this.prisma.parkingSlot.count({ where: { status: SlotStatus.MAINTENANCE, isActive: true } }),
    ]);

    return {
      totalSlots: total,
      occupied,
      available,
      reserved,
      maintenance,
      occupancyRate: total > 0 ? Math.round(((occupied + reserved) / total) * 100) : 0,
    };
  }

  async getRevenueReport(period: 'daily' | 'weekly' | 'monthly' = 'daily'): Promise<{
    totalRevenue: number;
    periodRevenue: number;
    period: string;
    transactionCount: number;
  }> {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'weekly':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }

    const [totalResult, periodResult, txCount] = await Promise.all([
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'COMPLETED' },
      }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'COMPLETED', paidAt: { gte: startDate } },
      }),
      this.prisma.payment.count({
        where: { status: 'COMPLETED', paidAt: { gte: startDate } },
      }),
    ]);

    return {
      totalRevenue: Number(totalResult._sum.amount ?? 0),
      periodRevenue: Number(periodResult._sum.amount ?? 0),
      period,
      transactionCount: txCount,
    };
  }

  async getPopularSlotsReport(): Promise<Array<{
    slotId: string;
    slotNumber: string;
    floorName: string;
    bookingCount: number;
    totalRevenue: number;
  }>> {
    const slots = await this.prisma.parkingSlot.findMany({
      where: { isActive: true },
      include: {
        floor: true,
        bookings: {
          where: { status: { in: [BookingStatus.COMPLETED, BookingStatus.ACTIVE] } },
          select: { id: true, totalAmount: true },
        },
      },
      orderBy: { slotNumber: 'asc' },
    });

    return slots
      .map((slot) => ({
        slotId: slot.id,
        slotNumber: slot.slotNumber,
        floorName: slot.floor.name,
        bookingCount: slot.bookings.length,
        totalRevenue: slot.bookings.reduce((sum, b) => sum + Number(b.totalAmount ?? 0), 0),
      }))
      .sort((a, b) => b.bookingCount - a.bookingCount)
      .slice(0, 10);
  }

  async getPeakHoursReport(): Promise<Array<{ hour: number; bookingCount: number }>> {
    const bookings = await this.prisma.booking.findMany({
      where: { status: { in: [BookingStatus.COMPLETED, BookingStatus.ACTIVE] } },
      select: { startTime: true },
    });

    const hourCounts = new Array(24).fill(0);
    bookings.forEach((b) => {
      const hour = b.startTime.getHours();
      hourCounts[hour]++;
    });

    return hourCounts.map((count, hour) => ({ hour, bookingCount: count }));
  }

  async getDashboardStats(): Promise<{
    totalUsers: number;
    totalVehicles: number;
    totalBookings: number;
    activeBookings: number;
    totalRevenue: number;
    occupancyRate: number;
  }> {
    const [users, vehicles, bookings, activeBookings, revenueResult, occupancy] = await Promise.all([
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.vehicle.count({ where: { isActive: true } }),
      this.prisma.booking.count(),
      this.prisma.booking.count({ where: { status: BookingStatus.ACTIVE } }),
      this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
      this.getOccupancyReport(),
    ]);

    return {
      totalUsers: users,
      totalVehicles: vehicles,
      totalBookings: bookings,
      activeBookings,
      totalRevenue: Number(revenueResult._sum.amount ?? 0),
      occupancyRate: occupancy.occupancyRate,
    };
  }
}
