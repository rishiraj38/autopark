import { Router } from 'express';
import { NotificationController } from './notification.controller';
import { authenticate } from '../../middleware/authenticate';
import { NotificationService } from './notification.service';

export function createNotificationRoutes(notificationService: NotificationService): Router {
  const router = Router();
  const controller = new NotificationController(notificationService);

  router.use(authenticate);

  router.get('/', controller.getUserNotifications);
  router.get('/unread-count', controller.getUnreadCount);
  router.put('/:id/read', controller.markAsRead);
  router.put('/read-all', controller.markAllAsRead);

  return router;
}
