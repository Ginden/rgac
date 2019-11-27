import { ShardStatus } from '../apiInterfaces';
import { ChildClient } from '../ChildClient';

export class StatusClient extends ChildClient {
    /**
     * @link https://developer.riotgames.com/apis#lol-status-v3/GET_getShardData
     * @description Get League of Legends status for the given shard.
     * @return {Promise<ShardStatus>}
     */
    public async shardData(): Promise<ShardStatus> {
        return this.doRequest({
            url: '/lol/status/v3/shard-data'
        });
    }
}
