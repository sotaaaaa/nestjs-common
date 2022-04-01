import { INestApplication } from '@nestjs/common';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export class AppUtils {
  //> Tuỳ từng môi trường có thể set lại timeout
  public static killAppWithGrace = (app: INestApplication) => {
    process.on('SIGINT', async () => {
      setTimeout(() => process.exit(1), 100);
      await app.close();
      process.exit(0);
    });

    // kill -15
    process.on('SIGTERM', async () => {
      setTimeout(() => process.exit(1), 100);
      await app.close();
      process.exit(0);
    });
  };

  /**
   * Chuuyển file yaml về định dạng JSON
   * @param path
   * @returns
   */
  public static loadYamlFile<T = any>(path: string) {
    return yaml.load(fs.readFileSync(path, 'utf8')) as T;
  }
}
