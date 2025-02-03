import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (!request) {
      throw new Error(
        'Request object is undefined. Ensure that GraphQL context includes req.',
      );
    }
    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext): Request {
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    return ctx.getContext<{ req: Request }>().req;
  }
}
