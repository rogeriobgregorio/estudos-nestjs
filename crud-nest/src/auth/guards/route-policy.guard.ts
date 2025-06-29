import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUEST_TOKEN_PAYLOAD_KEY, ROUTE_POLICY_KEY } from '../auth.constants';
import { RoutePolicies } from '../enum/route-policies.enum';
import { TokenPayloadDto } from '../dto/token-payload.dto';
import { Request } from 'express';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

@Injectable()
export class RoutePolicyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const routePolicyRequerid = this.reflector.get<RoutePolicies | undefined>(
      ROUTE_POLICY_KEY,
      context.getHandler(),
    );

    if (!routePolicyRequerid) {
      return true; // No policy required, allow access
    }

    const request = context.switchToHttp().getRequest<Request>();
    const tokenPayload = request[REQUEST_TOKEN_PAYLOAD_KEY] as TokenPayloadDto;

    if (!tokenPayload) {
      throw new UnauthorizedException('Token payload not found in request');
    }

    const { pessoa }: { pessoa: Pessoa } = tokenPayload;

    if (!pessoa.routePolicies.includes(routePolicyRequerid)) {
      throw new UnauthorizedException(
        `Access denied: Route policy ${routePolicyRequerid} not allowed for this user`,
      );
    }

    return true;
  }
}
