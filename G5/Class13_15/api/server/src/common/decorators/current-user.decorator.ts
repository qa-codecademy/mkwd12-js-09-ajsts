import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CurrentUser } from '../types/current-user.interface';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CurrentUser => {
    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
