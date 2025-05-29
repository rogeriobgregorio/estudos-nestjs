import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map();

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const url = request.url;

    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    return next.handle().pipe(
      tap(data => {
        this.cache.set(url, data);
      }),
    );
  }
}
