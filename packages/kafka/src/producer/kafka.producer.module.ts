import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, KafkaOptions, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from '@vicomm/kafka/producer/kafka.producer.service';
import { KAFKA_PRODUCER_SERVICE_NAME } from './kafka.producer.constant';

@Global()
@Module({})
export class KafkaProducerModule {
  static registerAsync(options: KafkaOptions['options']): DynamicModule {
    return {
      module: KafkaProducerModule,
      providers: [KafkaProducerService],
      exports: [KafkaProducerService],
      imports: [
        ClientsModule.registerAsync([
          {
            name: KAFKA_PRODUCER_SERVICE_NAME,
            useFactory: async () => ({
              transport: Transport.KAFKA,
              options: {
                ...options,
                send: { timeout: 10000, acks: -1 },
              },
            }),
          },
        ]),
      ],
    };
  }
}
