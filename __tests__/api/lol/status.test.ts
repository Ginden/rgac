import { RiotApiClient, J } from '../../../src';
import { Servers, ShardStatus } from '../../../src';
import { ShardStatusSchema } from '../../../src';

describe('RiotApiClient.leagueOfLegends.status', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey: String(process.env.RIOT_API_KEY),
            server: Servers.EUW1
        });
    });

    test('#shardData() returns valid schema', async () => {
        const data: ShardStatus = await client.leagueOfLegends.status.shardData();
        J.assert(data, ShardStatusSchema);
    });
});
