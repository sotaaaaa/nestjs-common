import { v4 as uuidv4 } from 'uuid';
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@vicomm/kafka/kafka.constant';
import { KAFKA_PRODUCER_SERVICE_NAME } from '@vicomm/kafka/producer/kafka.producer.constant';
import {
  IKafkaProducerOptions,
  IRequestKafka,
  IResponseKafka,
} from '@vicomm/kafka/producer/kafka.producer.interface';
import { firstValueFrom, Observable, timeout } from 'rxjs';

@Injectable()
export class KafkaProducerService implements OnApplicationBootstrap, OnModuleDestroy {
  protected logger = new Logger('VicommKafkaServer');
  protected readonly timeout: number = 10000;

  constructor(
    @Inject(KAFKA_PRODUCER_SERVICE_NAME)
    private readonly kafka: ClientKafka,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const topics: string[] = [...new Set(KAFKA_TOPICS)];

    for (const topic of topics) {
      this.kafka.subscribeToResponseOf(topic);
    }

    await this.kafka.connect();
    this.logger.log('Kafka connected');
  }

  async send<T>(
    topic: string,
    data: T,
    options?: IKafkaProducerOptions,
  ): Promise<Observable<IResponseKafka>> {
    const request: IRequestKafka<T> = {
      key: uuidv4(),
      value: data,
      headers: options && options.headers ? options.headers : undefined,
    };

    const message = await firstValueFrom(
      this.kafka
        .send<any, string>(topic, JSON.stringify(request))
        .pipe(timeout(this.timeout)),
    );

    return message;
  }

  async emit<T>(
    topic: string,
    data: T,
    options?: IKafkaProducerOptions,
  ): Promise<Observable<IResponseKafka>> {
    const request: IRequestKafka<T> = {
      key: uuidv4(),
      value: data,
      headers: options && options.headers ? options.headers : undefined,
    };

    return this.kafka
      .emit<any, string>(topic, JSON.stringify(request))
      .pipe(timeout(this.timeout));
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafka.close();
  }
}
