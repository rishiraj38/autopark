import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/abstract/BaseController';
import { BookingService } from './booking.service';
import { NotificationService } from '../notification/notification.service';

export class BookingController extends BaseController {
  private bookingService: BookingService;

  constructor(notificationService: NotificationService) {
    super();
    this.bookingService = new BookingService(notificationService);
  }

  getUserBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.bookingService.getUserBookings(req.user!.userId);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getBookingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.bookingService.getBookingById(req.params.id);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getAllBookings = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.bookingService.getAllBookings();
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.bookingService.createBooking(req.user!.userId, req.body);
      this.sendCreated(res, result);
    } catch (error) {
      next(error);
    }
  };

  cancelBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.bookingService.cancelBooking(req.params.id, req.user!.userId);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  checkin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.bookingService.checkin(req.params.id);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  checkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.bookingService.checkout(req.params.id);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };
}
