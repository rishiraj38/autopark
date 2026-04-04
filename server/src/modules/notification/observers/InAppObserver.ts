import { INotificationObserver, NotificationPayload } from '../../../core/interfaces/IObserver';
import { NotificationRepository } from '../notification.repository';
import { NotificationType } from '../../../core/types/enums';
import { Logger } from '../../../utils/logger';

const logger = new Logger('InAppObserver');

/**
 * Observer Pattern: Persists notifications to the database.
 * Liskov Substitution: Can replace any INotificationObserver.
 */
export class InAppObserver implements INotificationObserver {
  private notificationRepo: NotificationRepository;

  constructor() {
    this.notificationRepo = new NotificationRepository();
  }

  async update(payload: NotificationPayload): Promise<void> {
    try {
      await this.notificationRepo.createNotification(
        payload.userId,
        payload.type as NotificationType,
        payload.title,
        payload.message
      );
      logger.info('In-app notification saved', { userId: payload.userId, type: payload.type });
    } catch (error) {
      logger.error('Failed to save in-app notification', error as Error);
    }
  }
}
