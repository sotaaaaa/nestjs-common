import { INestApplication, Logger } from '@nestjs/common';
import { AppUtils } from '@vicomm/common';
import { MicroserviceTransporter } from '@vicomm/core/setup/microservices.transporter';

export interface MicroserviceSetupOptions {
  serviceName: string;
  yamlPath: string;
  port?: number;
}

export async function microserviceSetup(
  app: INestApplication,
  options?: MicroserviceSetupOptions,
) {
  //> Kill process
  AppUtils.killAppWithGrace(app);

  //> Mount các transporters theo config từ file yaml
  MicroserviceTransporter.setup({ app, yamlPath: options.yamlPath });

  //> Khởi service và lắng nghe dưới chế độ microservice
  await app.startAllMicroservices();
  await app.listen(options.port);

  Logger.log(`Service ${options.serviceName} running on: ${await app.getUrl()}`);
}
