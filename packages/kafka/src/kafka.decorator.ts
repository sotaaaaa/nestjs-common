import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const KafkaValue = createParamDecorator(
  (data: string, ctx: ExecutionContext): Record<string, any> => {
    const context = ctx.switchToRpc().getData();
    return context.value.value;
  },
);

export const KafkaHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext): Record<string, any> => {
    const context = ctx.switchToRpc().getData();
    return context.value.headers;
  },
);

export const KafkaKey = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const context = ctx.switchToRpc().getData();
    return context.value.key;
  },
);
