import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GoogleUserDto } from '@src/modules/user/dto/google-user.dto';

export const RequestGoogleUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): GoogleUserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as GoogleUserDto;
  },
);
