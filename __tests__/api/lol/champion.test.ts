import { RiotApiClient } from '../../../src';
import { ChampionInfo, Servers } from '../../../src/apiInterfaces';
import { ChampionInfoSchema } from '../../../src/schemas/generated';
import { saveData } from './helpers';
import { apiKey, server } from './helpers';
import Joi = require('@hapi/joi');

describe('RiotApiClient.leagueOfLegends.champions', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey,
            server
        });
    });

    test('#champions() returns valid schema', async () => {
        const data: ChampionInfo = await client.leagueOfLegends.champions.rotation();
        saveData(`leagueOfLegends.champions.rotation`, data);
        Joi.assert(data, ChampionInfoSchema);
    });
});
