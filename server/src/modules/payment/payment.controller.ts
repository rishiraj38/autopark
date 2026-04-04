import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/abstract/BaseController';
import { PaymentService } from './payment.service';
import { NotificationService } from '../notification/notification.service';

export class PaymentController extends BaseController {
  private paymentService: PaymentService;

  constructor(notificationService: NotificationService) {
    super();
    this.paymentService = new PaymentService(notificationService);
  }

  getUserPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.paymentService.getUserPayments(req.user!.userId);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getPaymentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.paymentService.getPaymentById(req.params.id);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  processPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.paymentService.processPayment(req.user!.userId, req.body);
      this.sendCreated(res, result);
    } catch (error) {
      next(error);
    }
  };

  refundPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.paymentService.refundPayment(req.params.id);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };
}
