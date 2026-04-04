import http from 'http';
import { Server } from 'socket.io';
import { config } from './config';
import { DatabaseConnection } from './config/database';
import { createApp } from './app';
import { Logger } from './utils/logger';

// Observer Pattern: Notification setup
import { NotificationService } from './modules/notification/notification.service';
import { InAppObserver } from './modules/notification/observers/InAppObserver';
import { WebSocketObserver } from './modules/notification/observers/WebSocketObserver';
import { EmailObserver } from './modules/notification/observers/EmailObserver';

const logger = new Logger('Server');

async function bootstrap(): Promise<void> {
  // Connect to database (Singleton Pattern)
  const db = DatabaseConnection.getInstance();
  await db.connect();

  // Create notification service (Observer Pattern Subject)
  const notificationService = new NotificationService();

  // Create Express app
  const app = createApp(notificationService);
  const server = http.createServer(app);

  // Setup WebSocket (Socket.IO)
  const io = new Server(server, {
    cors: {
      origin: config.cors.origin,
      methods: ['GET', 'POST'],
    },
  });

  // Attach observers to notification service (Observer Pattern)
  notificationService.attach(new InAppObserver());
  notificationService.attach(new WebSocketObserver(io));
  notificationService.attach(new EmailObserver());

  // WebSocket connection handling
  io.on('connection', (socket) => {
    logger.info('Client connected', { socketId: socket.id });

    socket.on('join', (userId: string) => {
      socket.join(`user:${userId}`);
      logger.info('User joined room', { userId, socketId: socket.id });
    });

    socket.on('disconnect', () => {
      logger.info('Client disconnected', { socketId: socket.id });
    });
  });

  // Start server
  server.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
    logger.info(`Environment: ${config.nodeEnv}`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Shutting down...');
    await db.disconnect();
    server.close();
    process.exit(0);
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((error) => {
  logger.error('Failed to start server', error);
  process.exit(1);
});
