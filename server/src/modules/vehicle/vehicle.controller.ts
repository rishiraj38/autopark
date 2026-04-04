import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/abstract/BaseController';
import { VehicleService } from './vehicle.service';

export class VehicleController extends BaseController {
  private vehicleService: VehicleService;

  constructor() {
    super();
    this.vehicleService = new VehicleService();
  }

  getUserVehicles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.vehicleService.getUserVehicles(req.user!.userId);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  createVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.vehicleService.createVehicle(req.user!.userId, req.body);
      this.sendCreated(res, result);
    } catch (error) {
      next(error);
    }
  };

  getVehicleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.vehicleService.getVehicleById(req.params.id);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  updateVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.vehicleService.updateVehicle(req.params.id, req.body);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  deleteVehicle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.vehicleService.deleteVehicle(req.params.id);
      this.sendNoContent(res);
    } catch (error) {
      next(error);
    }
  };
}
