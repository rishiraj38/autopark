import { INotificationSubject, INotificationObserver, NotificationPayload } from '../../core/interfaces/IObserver';
import { NotificationRepository } from './notification.repository';
import { NotificationResponseDTO } from './notification.dto';
import { Logger } from '../../utils/logger';

const logger = new Logger('NotificationService');

/**
 * Observer Pattern: NotificationService acts as the Subject.
 * - attach(): Register a new observer (notification channel)
 * - detach(): Remove an observer
 * - notify(): Push notification to ALL attached observers
 *
 * Open/Closed: Add new channels (Email, SMS, Push) by implementing
 * INotificationObserver and attaching — no changes to this class.
 */
export class NotificationService implements INotificationSubject {
  private observers: INotificationObserver[] = [];
  private notificationRepo: NotificationRepository;

  constructor() {
    this.notificationRepo = new NotificationRepository();
  }

  attach(observer: INotificationObserver): void {
    this.observers.push(observer);
    logger.info(`Observer attached. Total observers: ${this.observers.length}`);
  }

  detach(observer: INotificationObserver): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  async notify(payload: NotificationPayload): Promise<void> {
    logger.info(`Notifying ${this.observers.length} observers`, { type: payload.type });
    await Promise.allSettled(
      this.observers.map((observer) => observer.update(payload))
    );
  }

  // Direct CRUD for notification management
  async getUserNotifications(userId: string): Promise<NotificationResponseDTO[]> {
    const notifications = await this.notificationRepo.findByUserId(userId);
    return notifications.map((n) => ({
      id: n.id,
      userId: n.userId,
      type: n.type,
      title: n.title,
      message: n.message,
      isRead: n.isRead,
      createdAt: n.createdAt.toISOString(),
    }));
  }

  async markAsRead(id: string): Promise<NotificationResponseDTO> {
    const notification = await this.notificationRepo.markAsRead(id);
    return {
      id: notification.id,
      userId: notification.userId,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt.toISOString(),
    };
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepo.markAllAsRead(userId);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.notificationRepo.getUnreadCount(userId);
  }
}
