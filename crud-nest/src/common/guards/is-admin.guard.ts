import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    interface RequestWithUser extends Request {
      user?: { role?: string };
    }
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const role = request.user?.role;
    return role === 'admin';
  }
}
