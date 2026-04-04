import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/abstract/BaseController';
import { NotificationService } from './notification.service';

export class NotificationController extends BaseController {
  private notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    super();
    this.notificationService = notificationService;
  }

  getUserNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.notificationService.getUserNotifications(req.user!.userId);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  markAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.notificationService.markAsRead(req.params.id);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  markAllAsRead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.notificationService.markAllAsRead(req.user!.userId);
      this.sendSuccess(res, { message: 'All notifications marked as read' });
    } catch (error) {
      next(error);
    }
  };

  getUnreadCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const count = await this.notificationService.getUnreadCount(req.user!.userId);
      this.sendSuccess(res, { count });
    } catch (error) {
      next(error);
    }
  };
}
