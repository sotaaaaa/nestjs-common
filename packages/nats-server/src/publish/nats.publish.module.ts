import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, NatsOptions, Transport } from '@nestjs/microservices';
import { NATS_PUBLISH_SERVICE_NAME } from '../publish/nats.publish.constant';
import { NatsPublishService } from '../publish/nats.publish.service';

@Global()
@Module({})
export class NatsPublishModule {
  static registerAsync(options: NatsOptions['options']): DynamicModule {
    return {
      module: NatsPublishModule,
      providers: [NatsPublishService],
      exports: [NatsPublishService],
      imports: [
        ClientsModule.registerAsync([
          {
            name: NATS_PUBLISH_SERVICE_NAME,
            useFactory: async () => ({
              transport: Transport.NATS,
              options: options,
            }),
          },
        ]),
      ],
    };
  }
}
