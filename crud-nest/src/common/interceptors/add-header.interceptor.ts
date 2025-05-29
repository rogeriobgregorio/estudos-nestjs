import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<any> {
    const response = context.switchToHttp().getResponse<Response>();
    response.setHeader('X-Added-Header', 'This is a custom header');
    return next.handle();
  }
}
