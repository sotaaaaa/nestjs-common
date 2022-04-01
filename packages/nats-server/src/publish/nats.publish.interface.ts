import { IncomingMessage } from 'http';

export interface IRequestNatsHeader {
  customer?: string;
  tracing?: {
    id: string;
    timestamp?: number;
  };
}

export interface IRequestNats<T = Record<string, string>> {
  key: string;
  value: T;
  headers?: IRequestNatsHeader;
}

export interface INatsPublishOptions {
  headers?: IRequestNatsHeader;
}

export type IResponseNats = {
  response?: IncomingMessage;
};
