import { RiotApiClient } from '../../../src';
import { ChampionInfo, Servers } from '../../../src/apiInterfaces';
import { ChampionInfoSchema } from '../../../src/schemas/generated';
import Joi = require('@hapi/joi');

describe('RiotApiClient.leagueOfLegends.champions', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey: String(process.env.RIOT_API_KEY),
            server: Servers.EUW1
        });
    });

    test('#champions() returns valid schema', async () => {
        const data: ChampionInfo = await client.leagueOfLegends.champions.rotation();
        Joi.assert(data, ChampionInfoSchema);
    });
});
