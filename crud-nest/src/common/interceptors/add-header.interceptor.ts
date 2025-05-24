import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';

export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<any> {
    console.log('AddHeaderInterceptor executed');
    const response = context.switchToHttp().getResponse<Response>();
    response.setHeader('X-Added-Header', 'This is a custom header');
    return next.handle();
  }
}
