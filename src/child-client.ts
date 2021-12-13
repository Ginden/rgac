import { AxiosRequestConfig } from 'axios';
import { NonEnumerable } from './decorators';
import { RiotApiClient } from './riot-api-client';

export class ChildClient {
    @NonEnumerable
    protected readonly client: RiotApiClient;

    public constructor(client: RiotApiClient) {
        this.client = client;
    }

    protected doRequest<T = any>(
        opts: Partial<AxiosRequestConfig> | string,
        target: 'region' | 'platform' = 'platform'
    ): Promise<T> {
        return this.client.doRequest<T>(opts, target);
    }
}
