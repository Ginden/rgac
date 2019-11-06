import { FeaturedGames } from '../apiInterfaces';
import { ChildClient } from '../ChildClient';
import { AnySummonerFormat } from '../types';
import { CurrentGameInfo } from '../apiInterfaces';

export class SpectatorClient extends ChildClient {
    async activeGamesBySummoner(
        summoner: AnySummonerFormat
    ): Promise<CurrentGameInfo> {
        throw new Error('TBA');
    }

    async featuredGames(): Promise<FeaturedGames> {
        throw new Error('TBA');
    }
}
