import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../core/abstract/BaseController';
import { UserService } from './user.service';
import { Role } from '../../core/types/enums';

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.getProfile(req.user!.userId);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.updateProfile(req.user!.userId, req.body);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.getAllUsers();
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.getUserById(req.params.id);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.userService.updateRole(req.params.id, req.body.role as Role);
      this.sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };

  deactivateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.userService.deactivateUser(req.params.id);
      this.sendNoContent(res);
    } catch (error) {
      next(error);
    }
  };
}
