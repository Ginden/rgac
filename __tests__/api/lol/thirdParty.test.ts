import { RiotApiClient, Servers } from '../../../src';
import { apiKey, getSummoner, server } from './helpers';

describe.skip('RiotApiClient.leagueOfLegends.thirdParty', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey,
            server
        });
    });
    test('Gets data for summoner', async () => {
        expect(
            typeof (await client.leagueOfLegends.thirdParty.bySummoner(
                await getSummoner(client)
            ))
        ).toBe('string');
    });
});
