import { Inject } from '@nestjs/common';
import { NatsPublishService } from '@vicomm/nats-server/publish/nats.publish.service';

export function NatsPublish(): (
  target: Record<string, any>,
  key: string | symbol,
  index?: number,
) => void {
  return Inject(NatsPublishService);
}
