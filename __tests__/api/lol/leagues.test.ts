import {
    J,
    LeagueEntryDTO,
    LeagueEntryDTOSchema,
    LeagueListDTOSchema,
    RankedDivision,
    RankedQueue,
    RankedTier,
    RiotApiClient,
} from '../../../src';
import { apiKey, saveData, server } from './helpers';

describe('RiotApiClient.leagueOfLegends.league', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey,
            server,
        });
    });

    const queues: RankedQueue[] = [RankedQueue.RANKED_SOLO_5x5, RankedQueue.RANKED_FLEX_SR];
    for (const queue of queues) {
        test(`List challenger leagues in queue ${queue}`, async () => {
            const data = await client.leagueOfLegends.league.challengerLeagues(queue);
            J.assert(data, LeagueListDTOSchema);
            saveData(`leagueOfLegends/league/challengerLeagues/${queue}`, data);
        });

        test(`List grandmaster leagues in queue ${queue}`, async () => {
            const data = await client.leagueOfLegends.league.grandmasterLeagues(queue);
            J.assert(data, LeagueListDTOSchema);
            saveData(`leagueOfLegends/league/grandmaster/${queue}`, data);
        });

        test(`List master leagues in queue ${queue}`, async () => {
            const data = await client.leagueOfLegends.league.masterLeagues(queue);
            J.assert(data, LeagueListDTOSchema);
            saveData(`leagueOfLegends/league/master/${queue}`, data);
        });

        const tiers: RankedTier[] = [RankedTier.DIAMOND, RankedTier.PLATINUM];

        const division = RankedDivision.I;

        for (const tier of tiers) {
            test(`List leagues in queue ${queue}`, async () => {
                const { data } = await client.leagueOfLegends.league.entries(queue, tier, division);
                saveData(`leagueOfLegends/league/entries/${queue}.${tier}.${division}`, data);
                J.assert(data, J.array().items(LeagueEntryDTOSchema));
            });
        }
    }
});
