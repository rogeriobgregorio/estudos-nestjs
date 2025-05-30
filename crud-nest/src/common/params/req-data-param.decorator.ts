import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqDataParam = createParamDecorator(
  (data: keyof Request, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();
    const request = context.getRequest<Request>();
    return request[data];
  },
);
