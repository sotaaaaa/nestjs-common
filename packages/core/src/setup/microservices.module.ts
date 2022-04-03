import * as yaml from 'js-yaml';
import * as _ from 'lodash';
import * as fs from 'fs';

import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleYamlOptions, MicroserviceModuleOptions } from './interfaces';
import { KafkaProducerModule } from '../../../kafka/src';
import { KafkaOptions } from '@nestjs/microservices';
import { NatsPublishModule } from '../../../nats-server/src';

@Module({})
export class MicroserviceModule {
  static register(options?: MicroserviceModuleOptions): DynamicModule {
    const configs = this.loadYamlFile(options.yamlPath);
    const imports = [
      ConfigModule.forRoot({
        ignoreEnvFile: false,
        isGlobal: true,
        cache: true,
        envFilePath: ['.env'],
      }),
    ];

    //> Nếu bật nats sẽ import thêm module nats
    const nats = this.buildNatsServerConfig(configs);
    if (nats.enable) imports.push(NatsPublishModule.registerAsync(nats.options));

    //> Nếu bật kafka sẽ import thêm module kafka
    const kafka = this.buildKafkaConfig(configs);
    if (kafka.enable) imports.push(KafkaProducerModule.registerAsync(kafka.options));

    return {
      module: MicroserviceModule,
      imports: imports,
      controllers: [],
      providers: [],
    };
  }

  /**
   * Chuuyển file yaml về định dạng JSON
   * @param path
   * @returns
   */
  static loadYamlFile(path: string) {
    return yaml.load(fs.readFileSync(path, 'utf8')) as ConfigModuleYamlOptions;
  }

  /**
   * Trả về cấu hình kafka
   * @param options
   */
  static buildKafkaConfig(options: ConfigModuleYamlOptions) {
    const enable = _.get(options, 'transporters.kafka.enable', false) as boolean;
    const kafkaOptions = _.get(
      options,
      'transporters.kafka.options',
    ) as KafkaOptions['options'];

    return {
      enable: enable,
      options: kafkaOptions,
    };
  }

  /**
   * Trả về cấu hình nats sevrer
   * @param options
   */
  static buildNatsServerConfig(options: ConfigModuleYamlOptions) {
    const enable = _.get(options, 'transporters.nats.enable', false) as boolean;
    const natsServerOptions = _.get(
      options,
      'transporters.nats.options',
    ) as KafkaOptions['options'];

    return {
      enable: enable,
      options: natsServerOptions,
    };
  }
}
