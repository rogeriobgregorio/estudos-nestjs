import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { tap } from 'rxjs';

export class TimingConnection implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();
    console.log('TimingConnection Interceptor executed');

    await new Promise(resolve => setTimeout(resolve, 10000));

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request duration: ${duration}ms`);
        console.log('TimingConnection Interceptor completed');
      }),
    );
  }
}
