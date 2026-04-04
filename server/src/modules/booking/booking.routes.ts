import { Router } from 'express';
import { BookingController } from './booking.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate';
import { createBookingSchema } from './booking.dto';
import { Role } from '../../core/types/enums';
import { NotificationService } from '../notification/notification.service';

export function createBookingRoutes(notificationService: NotificationService): Router {
  const router = Router();
  const controller = new BookingController(notificationService);

  router.use(authenticate);

  router.get('/', controller.getUserBookings);
  router.post('/', validate(createBookingSchema), controller.createBooking);
  router.get('/all', authorize(Role.ADMIN), controller.getAllBookings);
  router.get('/:id', controller.getBookingById);
  router.put('/:id/cancel', controller.cancelBooking);
  router.post('/:id/checkin', controller.checkin);
  router.post('/:id/checkout', controller.checkout);

  return router;
}
