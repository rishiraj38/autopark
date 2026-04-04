import { Payment } from '@prisma/client';
import { PaymentResponseDTO } from './payment.dto';

export class PaymentMapper {
  static toDTO(payment: Payment): PaymentResponseDTO {
    return {
      id: payment.id,
      bookingId: payment.bookingId,
      userId: payment.userId,
      amount: Number(payment.amount),
      method: payment.method,
      status: payment.status,
      transactionId: payment.transactionId,
      paidAt: payment.paidAt?.toISOString() ?? null,
      createdAt: payment.createdAt.toISOString(),
    };
  }

  static toDTOList(payments: Payment[]): PaymentResponseDTO[] {
    return payments.map(PaymentMapper.toDTO);
  }
}
