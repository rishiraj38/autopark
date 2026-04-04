import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createPaymentSchema } from './payment.dto';
import { Role } from '../../core/types/enums';
import { NotificationService } from '../notification/notification.service';

export function createPaymentRoutes(notificationService: NotificationService): Router {
  const router = Router();
  const controller = new PaymentController(notificationService);

  router.use(authenticate);

  router.get('/', controller.getUserPayments);
  router.post('/', validate(createPaymentSchema), controller.processPayment);
  router.get('/:id', controller.getPaymentById);
  router.post('/:id/refund', authorize(Role.ADMIN), controller.refundPayment);

  return router;
}
