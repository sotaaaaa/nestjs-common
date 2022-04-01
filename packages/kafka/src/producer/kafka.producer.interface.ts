import { IncomingMessage } from 'http';

export interface IRequestKafkaHeader {
  customer?: string;
  tracing?: {
    id: string;
    timestamp?: number;
  };
}

export interface IRequestKafka<T = Record<string, string>> {
  key: string;
  value: T;
  headers?: IRequestKafkaHeader;
}

export interface IKafkaProducerOptions {
  headers?: IRequestKafkaHeader;
}

export type IResponseKafka = {
  response?: IncomingMessage;
};
