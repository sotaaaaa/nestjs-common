import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface CoreModuleOptions {
  path: string;
  application?: {
    name: string;
    port: string;
  };
}

export interface CoreModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) =>
    | CoreModuleOptions
    | CoreModuleOptions[]
    | Promise<CoreModuleOptions>
    | Promise<CoreModuleOptions[]>;
  inject?: any[];
}
