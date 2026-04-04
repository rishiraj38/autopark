import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/abstract/BaseController';
import { ParkingService } from './parking.service';
import { SlotStatus, SlotType, VehicleType } from '../../core/types/enums';

export class ParkingController extends BaseController {
  private parkingService: ParkingService;

  constructor() {
    super();
    this.parkingService = new ParkingService();
  }

  getAllSlots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const filters: any = {};
      if (req.query.status) filters.status = req.query.status as SlotStatus;
      if (req.query.type) filters.type = req.query.type as SlotType;
      if (req.query.floorId) filters.floorId = req.query.floorId as string;
      const result = await this.parkingService.getAllSlots(filters);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getSlotById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.parkingService.getSlotById(req.params.id);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  createSlot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.parkingService.createSlot(req.body);
      this.sendCreated(res, result);
    } catch (error) {
      next(error);
    }
  };

  updateSlot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.parkingService.updateSlot(req.params.id, req.body);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  deleteSlot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.parkingService.deleteSlot(req.params.id);
      this.sendNoContent(res);
    } catch (error) {
      next(error);
    }
  };

  getAvailableSlots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const vehicleType = req.query.vehicleType as VehicleType | undefined;
      const result = await this.parkingService.getAvailableSlots(vehicleType);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  allocateSlot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { vehicleType, strategy } = req.body;
      const result = await this.parkingService.allocateSlot(vehicleType as VehicleType, strategy);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getAllFloors = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.parkingService.getAllFloors();
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  createFloor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.parkingService.createFloor(req.body);
      this.sendCreated(res, result);
    } catch (error) {
      next(error);
    }
  };
}
