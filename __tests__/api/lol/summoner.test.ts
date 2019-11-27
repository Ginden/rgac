import { ApiSummonerInfoSchema, J, RiotApiClient } from '../../../src';
import { apiKey, saveData, server } from './helpers';

const startUser = 'GindenEU';

describe('RiotApiClient.leagueOfLegends.summoner', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey,
            server
        });
    });

    test('Data matches on all methods', async () => {
        const byName = await client.leagueOfLegends.summoner.byName(startUser);
        const byPuuidData = await client.leagueOfLegends.summoner.byPuuid(
            byName.puuid
        );
        const bySummonerId = await client.leagueOfLegends.summoner.bySummonerId(
            byName.id
        );
        const byAccountId = await client.leagueOfLegends.summoner.byAccount(
            byName.accountId
        );

        J.assert(byName, ApiSummonerInfoSchema);
        J.assert(byPuuidData, ApiSummonerInfoSchema);
        J.assert(bySummonerId, ApiSummonerInfoSchema);
        J.assert(byAccountId, ApiSummonerInfoSchema);

        expect(byName).toEqual(byPuuidData);
        expect(byName).toEqual(bySummonerId);
        expect(byName).toEqual(byAccountId);

        saveData(`leagueOfLegends.summoner.by-name`, byName);
    });
});
