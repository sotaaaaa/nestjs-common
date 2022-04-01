import { INestApplication } from '@nestjs/common';

export interface MicroserviceTransporterOptions {
  yamlPath: string;
  app: INestApplication;
}
