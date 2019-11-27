import { RiotApiClient, J } from '../../../src';
import { Servers, ShardStatus } from '../../../src';
import { ShardStatusSchema } from '../../../src';
import { apiKey, saveData, server } from './helpers';

describe('RiotApiClient.leagueOfLegends.status', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey,
            server
        });
    });

    test('#shardData() returns valid schema', async () => {
        const data: ShardStatus = await client.leagueOfLegends.status.shardData();
        saveData(`leagueOfLegends.status.shardData`, data);
        J.assert(data, ShardStatusSchema);
    });
});
