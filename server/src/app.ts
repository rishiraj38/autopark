import express from 'express';
import cors from 'cors';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';

// Route imports
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import vehicleRoutes from './modules/vehicle/vehicle.routes';
import parkingRoutes from './modules/parking/parking.routes';
import reportRoutes from './modules/report/report.routes';
import { createBookingRoutes } from './modules/booking/booking.routes';
import { createPaymentRoutes } from './modules/payment/payment.routes';
import { createNotificationRoutes } from './modules/notification/notification.routes';

// Notification service (Observer Pattern Subject)
import { NotificationService } from './modules/notification/notification.service';

export function createApp(notificationService: NotificationService) {
  const app = express();

  // Middleware
  app.use(cors({ origin: config.cors.origin, credentials: true }));
  app.use(express.json());

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } });
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/vehicles', vehicleRoutes);
  app.use('/api/parking', parkingRoutes);
  app.use('/api/bookings', createBookingRoutes(notificationService));
  app.use('/api/payments', createPaymentRoutes(notificationService));
  app.use('/api/notifications', createNotificationRoutes(notificationService));
  app.use('/api/reports', reportRoutes);

  // Global error handler
  app.use(errorHandler);

  return app;
}
