import { DynamicModule, Module } from '@nestjs/common';
import { CoreModuleAsyncOptions, CoreModuleOptions } from './core.interface';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

@Module({})
export class CoreModule {
  static forRoot(options: CoreModuleOptions): DynamicModule {
    const config = this.loadYamlFile(options);
    console.log(config, 'config');
    return {
      module: CoreModule,
      imports: [],
    };
  }

  static forRootAsync(options: CoreModuleAsyncOptions) {
    console.log('2', options);
  }

  private static loadYamlFile(options: CoreModuleOptions): Record<string, any> {
    let config = {};
    if (fs.existsSync(options.path)) {
      config = Object.assign(
        yaml.load(fs.readFileSync(options.path, 'utf8')),
        config,
      );
    }
    return config;
  }
}
