import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Servers } from './apiInterfaces';

export interface ClientOptions {
    apiKey: string;
    server: Servers;
    axios?:
        | {
              client: AxiosInstance;
              requestOptions: never;
          }
        | {
              client: never;
              requestOptions: Partial<AxiosRequestConfig>;
          };
    rateLimit?: {
        maxRequests: number;
        perMilliseconds: number;
    };
}
