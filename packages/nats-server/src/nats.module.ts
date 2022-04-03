import { DynamicModule, Module } from '@nestjs/common';
import { NatsOptions } from '@nestjs/microservices';
import { NatsPublishModule } from './publish';

@Module({})
export class NatModule {
  static register(options: NatsOptions['options']): DynamicModule {
    return {
      module: NatModule,
      providers: [],
      exports: [],
      imports: [NatsPublishModule.registerAsync(options)],
    };
  }
}
