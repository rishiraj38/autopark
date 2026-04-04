import { Request, Response, NextFunction } from 'express';
import { Role } from '../core/types/enums';
import { AuthorizationError } from '../core/errors/AuthorizationError';

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AuthorizationError('User not authenticated');
    }

    if (!roles.includes(req.user.role as Role)) {
      throw new AuthorizationError(`Role '${req.user.role}' is not authorized for this resource`);
    }

    next();
  };
}
