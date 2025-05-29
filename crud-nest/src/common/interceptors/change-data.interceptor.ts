import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  intercept<T>(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data: T) => {
        return data;
      }),
    );
  }
}
