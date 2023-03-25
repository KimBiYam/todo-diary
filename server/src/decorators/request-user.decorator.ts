import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RequestUserDto } from '@src/modules/user/dto';

export const RequestUser = createParamDecorator(
  (data: unknown, context: ExecutionContextHost): RequestUserDto => {
    const request = context.switchToHttp().getRequest();
    const { id, displayName } = request.user;

    const user = new RequestUserDto();
    user.id = id;
    user.displayName = displayName;

    return user;
  },
);

export const RequestUserForResolver = createParamDecorator(
  (_, context: ExecutionContextHost): RequestUserDto | null => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const { id, displayName } = req.user;

    const user = new RequestUserDto();
    user.id = id;
    user.displayName = displayName;

    return user;
  },
);
