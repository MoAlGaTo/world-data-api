import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../user.schema';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const user: User = gqlContext.getContext().req.user;
    return user;
  },
);
