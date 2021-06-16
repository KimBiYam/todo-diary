import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUserDto } from 'src/modules/user/dto/request-user.dto';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
