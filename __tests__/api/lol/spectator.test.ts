import {
    RiotApiClient,
    J,
    FeaturedGames,
    FeaturedGamesSchema
} from '../../../src';
import { apiKey, saveData, server } from './helpers';

describe('RiotApiClient.leagueOfLegends.spectator', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey,
            server
        });
    });

    test('#featuredGames() matches schema', async () => {
        const data: FeaturedGames = await client.leagueOfLegends.spectator.featuredGames();
        saveData(`leagueOfLegends.spectator.featuredGames`, data);
        J.assert(data, FeaturedGamesSchema);
    });
});
