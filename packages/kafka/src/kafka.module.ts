import { DynamicModule, Module } from '@nestjs/common';
import { KafkaOptions } from '@nestjs/microservices';
import { KafkaProducerModule } from '@vicomm/kafka/producer/kafka.producer.module';

@Module({})
export class KafkaModule {
  static register(options: KafkaOptions['options']): DynamicModule {
    return {
      module: KafkaModule,
      providers: [],
      exports: [],
      imports: [KafkaProducerModule.registerAsync(options)],
    };
  }
}
