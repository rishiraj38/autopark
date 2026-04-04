import { Response } from 'express';

/**
 * Abstract Base Controller — Inheritance.
 * All module controllers extend this for consistent response formatting.
 */
export abstract class BaseController {
  protected sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
    res.status(statusCode).json({ success: true, data });
  }

  protected sendCreated<T>(res: Response, data: T): void {
    this.sendSuccess(res, data, 201);
  }

  protected sendNoContent(res: Response): void {
    res.status(204).send();
  }

  protected sendPaginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number
  ): void {
    res.status(200).json({
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
}
