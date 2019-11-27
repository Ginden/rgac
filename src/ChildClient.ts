import { AxiosRequestConfig } from 'axios';
import { NonEnumerable } from './decorators';
import { RiotApiClient } from './RiotApiClient';

export class ChildClient {
    @NonEnumerable
    protected readonly client: RiotApiClient;

    public constructor(client: RiotApiClient) {
        this.client = client;
    }

    protected doRequest<T = any>(
        opts: Partial<AxiosRequestConfig>
    ): Promise<T> {
        return this.client.doRequest<T>(opts);
    }
}
