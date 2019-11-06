import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Servers } from './apiInterfaces';

export interface ClientOptions {
    apiKey: string;
    server: Servers | string;
    axios?: {
        client?: AxiosInstance;
        requestOptions?: Partial<AxiosRequestConfig>;
    };
    rateLimit?: {
        maxRequests: number;
        perMilliseconds: number;
    };
}
