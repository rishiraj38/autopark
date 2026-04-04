import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/errors/AppError';
import { ValidationError } from '../core/errors/ValidationError';
import { Logger } from '../utils/logger';

const logger = new Logger('ErrorHandler');

/**
 * Global error handler middleware.
 * Polymorphism: handles any AppError subclass via statusCode property.
 */
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
        ...(err instanceof ValidationError && err.fields ? { fields: err.fields } : {}),
      },
    });
    return;
  }

  logger.error('Unhandled error', err);
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      statusCode: 500,
    },
  });
}
