import { ApiSummonerInfoSchema, J, RiotApiClient } from '../../../src';
import { apiKey, saveData, server, summonerName } from './helpers';
import { omit } from 'lodash';

describe('RiotApiClient.leagueOfLegends.summoner', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey,
            server,
        });
    });

    test('Data matches on all methods', async () => {
        const byName = await client.leagueOfLegends.summoner.byName(summonerName);
        const byPuuidData = await client.leagueOfLegends.summoner.byPuuid(byName.puuid);
        const bySummonerId = await client.leagueOfLegends.summoner.bySummonerId(byName.id);
        const byAccountId = await client.leagueOfLegends.summoner.byAccount(byName.accountId);

        J.assert(byName, ApiSummonerInfoSchema);
        J.assert(byPuuidData, ApiSummonerInfoSchema);
        J.assert(bySummonerId, ApiSummonerInfoSchema);
        J.assert(byAccountId, ApiSummonerInfoSchema);

        expect(omit(byName, 'revisionDate')).toEqual(omit(byPuuidData, 'revisionDate'));
        expect(omit(byName, 'revisionDate')).toEqual(omit(bySummonerId, 'revisionDate'));
        expect(omit(byName, 'revisionDate')).toEqual(omit(byAccountId, 'revisionDate'));

        saveData(`leagueOfLegends/summoner/by-name`, byName);
    });
});
