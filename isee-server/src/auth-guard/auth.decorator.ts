import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.user_id;
  },
);
