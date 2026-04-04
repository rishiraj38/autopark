import { INotificationObserver, NotificationPayload } from '../../../core/interfaces/IObserver';
import { Logger } from '../../../utils/logger';

const logger = new Logger('EmailObserver');

/**
 * Observer Pattern: Sends email notifications.
 * In production, this would integrate with a mail service (SendGrid, SES, etc.).
 * Currently simulates email sending for demonstration.
 */
export class EmailObserver implements INotificationObserver {
  async update(payload: NotificationPayload): Promise<void> {
    try {
      // Simulate email sending
      logger.info('Email notification sent (simulated)', {
        userId: payload.userId,
        type: payload.type,
        title: payload.title,
      });
    } catch (error) {
      logger.error('Failed to send email notification', error as Error);
    }
  }
}
