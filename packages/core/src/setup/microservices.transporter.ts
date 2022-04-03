import * as _ from 'lodash';

import { INestApplication, Logger } from '@nestjs/common';
import { AppUtils } from '../../../common/src';
import { ConfigModuleYamlOptions } from '../../../core/src/setup/interfaces';
import { MicroserviceTransporterOptions } from '../../../core/src/setup/interfaces/microservices-transporter.type';
import { KafkaOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';

export class MicroserviceTransporter {
  public static options: ConfigModuleYamlOptions;
  public static application: INestApplication;
  public static logger = new Logger('CustomTransporters');

  public static setup(config: MicroserviceTransporterOptions) {
    this.options = AppUtils.loadYamlFile(config.yamlPath);
    this.application = config.app;

    //> Cấu hình toàn bộ transporters theo cấu hình ở file yaml
    this.setupTransporters();
  }

  /**
   * Cấu hình kafka event driver
   */
  public static setupTransporters() {
    const kafka = this.buildKafkaConfig(this.options);
    const nats = this.buildNatsServerConfig(this.options);

    //> Nếu kafka được bật sẽ thực hiện connect đến kafka
    if (kafka.enable) {
      this.application.connectMicroservice<MicroserviceOptions>({
        transport: Transport.KAFKA,
        options: kafka.options,
      });

      this.logger.log('Setup kafka transporter successfully');
    }

    //> Nếu nats được bật sẽ thực hiện connect đến nats
    if (nats.enable) {
      this.application.connectMicroservice<MicroserviceOptions>({
        transport: Transport.NATS,
        options: nats.options,
      });

      this.logger.log('Setup nats server transporter successfully');
    }
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

  /**
   * Trả về cấu hình dưới định dạn JSON
   * @returns
   */
  public static getOptions() {
    return this.options;
  }

  /**
   * Application
   * @returns
   */
  public static getApplications() {
    return this.application;
  }
}
