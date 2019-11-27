import {
    ChampionId,
    ChampionMasteryDTO,
    ChampionMasteryDTOSchema,
    RiotApiClient
} from '../../../src';
import { getSummoner, apiKey, server, saveData } from './helpers';
import Joi = require('@hapi/joi');
import { J } from '../../../src/schemas';
import { Summoner } from '../../../src/apiClasses';

describe('RiotApiClient.leagueOfLegends.championMasteries', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey,
            server
        });
    });

    test('#championMasteries.bySummoner() matches schema', async () => {
        const summoner = await getSummoner(client);
        const data: ChampionMasteryDTO[] = await summoner.getChampionMasteries();
        saveData(`leagueOfLegends.championMasteries.by-summoner`, data);
        expect(data.length).toBeGreaterThan(0);
        for (const el of data) {
            Joi.assert(el, ChampionMasteryDTOSchema);
        }
    });

    test('#championMasteries.bySummonerAndChampion() matches schema', async () => {
        const summoner = await getSummoner(client);
        const data: ChampionMasteryDTO = await summoner.getChampionMastery(
            ChampionId.Swain
        );
        saveData(
            `leagueOfLegends.championMasteries.by-summoner-and-champion`,
            data
        );
        Joi.assert(data, ChampionMasteryDTOSchema);
    });

    test('#championMasteries.scoresBySummoner() is number', async () => {
        const summoner = await getSummoner(client);
        const data: number = await client.lol.championMasteries.scoresBySummoner(
            summoner
        );
        saveData(`leagueOfLegends.championMasteries.summoner-score`, data);
        expect(typeof data).toBe('number');
    });

    test('#getChampionMasteries() returns valid schema', async () => {
        const summoner: Summoner = await getSummoner(client);
        const arr = await summoner.getChampionMasteries();
        saveData(`leagueOfLegends.championMasteries.all`, arr);
        for (const mastery of arr) {
            J.assert(mastery, ChampionMasteryDTOSchema);
        }
    });

    test('#getChampionMastery() returns valid schema', async () => {
        const summoner: Summoner = await getSummoner(client);
        const mastery = await summoner.getChampionMastery(ChampionId.ChoGath);
        saveData(`leagueOfLegends.championMasteries.cho`, mastery);
        J.assert(mastery, ChampionMasteryDTOSchema);
    });

    test('#getChampionMastery() returns valid schema', async () => {
        const summoner: Summoner = await getSummoner(client);
        const mastery = await client.lol.championMasteries.scoresBySummoner(
            summoner
        );
        saveData(`leagueOfLegends.championMasteries.totalMastery`, mastery);
        expect(typeof mastery).toBe('number');
    });
});
