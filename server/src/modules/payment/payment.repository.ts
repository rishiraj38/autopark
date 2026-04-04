import { Payment, Prisma } from '@prisma/client';
import { BaseRepository } from '../../core/abstract/BaseRepository';

export class PaymentRepository extends BaseRepository<Payment, Prisma.PaymentCreateInput, Prisma.PaymentUpdateInput> {
  protected entityName = 'Payment';

  protected getModelDelegate() {
    return this.prisma.payment;
  }

  async findByUserId(userId: string): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByBookingId(bookingId: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({ where: { bookingId } });
  }

  async getTotalRevenue(): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'COMPLETED' },
    });
    return Number(result._sum.amount ?? 0);
  }

  async getRevenueByPeriod(startDate: Date, endDate: Date): Promise<number> {
    const result = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: 'COMPLETED',
        paidAt: { gte: startDate, lte: endDate },
      },
    });
    return Number(result._sum.amount ?? 0);
  }
}
