import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { error } from 'console';
import e from 'express';
import { stat } from 'fs';

//? Фильтр для отлова всех ошибок в одном месте и возвращения их в едином формате
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const timestamp = Date.now();
    const path = req.url;

    //? Ошибки неста
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      const message =
        typeof response === 'string'
          ? response
          : (response as any).message || exception.message;

      const details = typeof response === 'object' ? (response as any) : null;

      return res.status(status).json({
        success: false,
        timestamp,
        path,
        error: {
          statusCode: status,
          message,
          code: 'HTTP_EXCEPTION',
          details,
        },
      });
    }

    //? Ошибки призмы
    const prismaCode = (exception as any)?.code;
    if (prismaCode) {
      const mapped = this.mapPrismaError(exception as any);

      return res.status(mapped.status).json({
        success: false,
        timestamp,
        path,
        error: {
          statusCode: mapped.status,
          message: mapped.message,
          code: mapped.code,
          details: exception,
        },
      });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      timestamp,
      path,
      error: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
        code: 'INTERNAL_SERVER_ERROR',
        details: exception,
      },
    });
  }

  private mapPrismaError(err: any): {
    status: number;
    message: string;
    code: string;
    details: any;
  } {
    // P2002 — Unique constraint failed
    if (err.code === 'P2002') {
      return {
        status: 409,
        message: 'Unique constraint failed',
        code: 'PRISMA_UNIQUE_CONSTRAINT',
        details: err.meta ?? null,
      };
    }

    // P2025 — Record to update/delete not found
    if (err.code === 'P2025') {
      return {
        status: 404,
        message: 'Record not found',
        code: 'PRISMA_RECORD_NOT_FOUND',
        details: err.meta ?? null,
      };
    }

    // Всё остальное от Prisma
    return {
      status: 400,
      message: 'Database request error',
      code: `PRISMA_${err.code}`,
      details: err.meta ?? null,
    };
  }
}
