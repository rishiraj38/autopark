/**
 * Observer Pattern Interfaces.
 * Interface Segregation: Observer has single method update().
 * Open/Closed: New notification channels implement INotificationObserver.
 * Dependency Inversion: NotificationService depends on abstractions.
 */

export interface NotificationPayload {
  userId: string;
  type: string;
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}

export interface INotificationObserver {
  update(payload: NotificationPayload): Promise<void>;
}

export interface INotificationSubject {
  attach(observer: INotificationObserver): void;
  detach(observer: INotificationObserver): void;
  notify(payload: NotificationPayload): Promise<void>;
}
