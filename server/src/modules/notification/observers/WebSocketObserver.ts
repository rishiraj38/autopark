import { Server } from 'socket.io';
import { INotificationObserver, NotificationPayload } from '../../../core/interfaces/IObserver';
import { Logger } from '../../../utils/logger';

const logger = new Logger('WebSocketObserver');

/**
 * Observer Pattern: Pushes real-time notifications via WebSocket.
 */
export class WebSocketObserver implements INotificationObserver {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  async update(payload: NotificationPayload): Promise<void> {
    try {
      this.io.to(`user:${payload.userId}`).emit('notification', {
        type: payload.type,
        title: payload.title,
        message: payload.message,
        timestamp: new Date().toISOString(),
      });
      logger.info('WebSocket notification sent', { userId: payload.userId, type: payload.type });
    } catch (error) {
      logger.error('Failed to send WebSocket notification', error as Error);
    }
  }
}
