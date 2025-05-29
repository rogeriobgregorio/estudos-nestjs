import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnection implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();

    await new Promise(resolve => setTimeout(resolve, 10000));

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request duration: ${duration}ms`);
      }),
    );
  }
}
