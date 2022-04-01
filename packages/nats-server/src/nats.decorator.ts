import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const NatsValue = createParamDecorator(
  (data: string, ctx: ExecutionContext): Record<string, any> => {
    const context = ctx.switchToRpc().getData();
    return context.value;
  },
);

export const NatsHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext): Record<string, any> => {
    const context = ctx.switchToRpc().getData();
    return context.headers;
  },
);

export const NatsKey = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const context = ctx.switchToRpc().getData();
    return context.key;
  },
);
