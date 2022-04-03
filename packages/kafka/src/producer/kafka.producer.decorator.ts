import { Inject } from '@nestjs/common';
import { KafkaProducerService } from './kafka.producer.service';

export function KafkaClient(): (
  target: Record<string, any>,
  key: string | symbol,
  index?: number,
) => void {
  return Inject(KafkaProducerService);
}
