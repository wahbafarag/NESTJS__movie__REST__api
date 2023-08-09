import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../schemas/user.schema';

type userType = typeof User;

export const CurrentUser = createParamDecorator(
  (data: userType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;

    // return data ? user && user.data : user;
  },
);
