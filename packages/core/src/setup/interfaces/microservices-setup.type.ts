import { KafkaOptions } from '@nestjs/microservices';

export interface MicroserviceKafkaOptions {
  enable: boolean;
  options: KafkaOptions['options'];
}

export interface MicroserviceNatsOptions {
  enable: boolean;
  options: any;
}

export interface MicroserviceModuleOptions {
  yamlPath?: string;
}

export interface ConfigModuleYamlOptions {
  version: '1.0';
  config: { env: string };
  transporters: {
    kafka: {
      enable: boolean;
      options: KafkaOptions['options'];
    };
    nats: {
      enable: boolean;
      options: any;
    };
  };
  health: {
    enable: boolean;
    path: string;
    timeout: number;
  };
}
