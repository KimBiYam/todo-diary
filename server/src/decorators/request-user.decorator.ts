import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUserDto } from '@src/modules/user/dto';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUserDto => {
    const request = ctx.switchToHttp().getRequest();
    const { id, displayName } = request.user;

    const user = new RequestUserDto();
    user.id = id;
    user.displayName = displayName;

    return user;
  },
);
