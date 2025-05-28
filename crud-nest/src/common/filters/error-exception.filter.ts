import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ErrorExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const statusCode = exception.getStatus ? exception.getStatus() : 500;

    const exceptionResponse = exception.getResponse
      ? exception.getResponse()
      : { message: 'Error', statusCode };

    // Ensure exceptionResponse is always an object
    const responseBody =
      typeof exceptionResponse === 'object' && exceptionResponse !== null
        ? exceptionResponse
        : { message: exceptionResponse, statusCode };

    response.status(statusCode).json({
      ...responseBody,
      data: new Date().toISOString(),
      path: request.url,
    });
  }
}
