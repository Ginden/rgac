import { NonEnumerable } from './decorators';
import { RiotApiClient } from './RiotApiClient';

export class ChildClient {
    @NonEnumerable
    protected readonly client: RiotApiClient;

    constructor(client: RiotApiClient) {
        this.client = client;
    }
}
