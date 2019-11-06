import { ShardStatus } from '../apiInterfaces';
import { ChildClient } from '../ChildClient';

export class StatusClient extends ChildClient {
    async shardData(): Promise<ShardStatus> {
        return this.client.doRequest({
            url: '/lol/status/v3/shard-data'
        });
    }
}
