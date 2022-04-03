import { v4 as uuidv4 } from 'uuid';
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { NATS_PUBLISH_SERVICE_NAME } from '../publish/nats.publish.constant';
import {
  INatsPublishOptions,
  IRequestNats,
  IResponseNats,
} from '../publish/nats.publish.interface';
import { firstValueFrom, Observable, timeout } from 'rxjs';

@Injectable()
export class NatsPublishService implements OnApplicationBootstrap, OnModuleDestroy {
  protected logger = new Logger('VicommNatsServer');
  protected readonly timeout: number = 10000;

  constructor(
    @Inject(NATS_PUBLISH_SERVICE_NAME)
    private readonly nats: ClientNats,
  ) {}

  /**
   * Connect đến nats server
   */
  async onApplicationBootstrap(): Promise<void> {
    await this.nats.connect();
    this.logger.log('Nats server connected');
  }

  async send<T>(
    event: string,
    data: T,
    options?: INatsPublishOptions,
  ): Promise<Observable<IResponseNats>> {
    const request: IRequestNats<T> = {
      key: uuidv4(),
      value: data,
      headers: options && options.headers ? options.headers : undefined,
    };

    const message = await firstValueFrom(
      this.nats.send<any, IRequestNats<T>>(event, request).pipe(timeout(this.timeout)),
    );

    return message;
  }

  async emit<T>(
    event: string,
    data: T,
    options?: INatsPublishOptions,
  ): Promise<Observable<IResponseNats>> {
    const request: IRequestNats<T> = {
      key: uuidv4(),
      value: data,
      headers: options && options.headers ? options.headers : undefined,
    };

    return this.nats
      .emit<any, IRequestNats<T>>(event, request)
      .pipe(timeout(this.timeout));
  }

  async onModuleDestroy(): Promise<void> {
    await this.nats.close();
  }
}
