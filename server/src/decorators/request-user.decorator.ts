import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUserDto } from '../modules/user/dto/request-user.dto';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUserDto => {
    const request = ctx.switchToHttp().getRequest();
    const { userId, username } = request.user;

    const user = new RequestUserDto();
    user.displayName = userId;
    user.email = username;

    return user;
  },
);
