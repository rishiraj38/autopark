import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/abstract/BaseController';
import { ReportService } from './report.service';

export class ReportController extends BaseController {
  private reportService: ReportService;

  constructor() {
    super();
    this.reportService = new ReportService();
  }

  getOccupancy = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.reportService.getOccupancyReport();
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getRevenue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const period = (req.query.period as 'daily' | 'weekly' | 'monthly') || 'daily';
      const result = await this.reportService.getRevenueReport(period);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getPopularSlots = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.reportService.getPopularSlotsReport();
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getPeakHours = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.reportService.getPeakHoursReport();
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getDashboardStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.reportService.getDashboardStats();
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };
}
