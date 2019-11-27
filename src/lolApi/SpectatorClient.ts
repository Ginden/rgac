import { CurrentGameInfo, FeaturedGames } from '../apiInterfaces';
import { ChildClient } from '../ChildClient';
import { AnySummonerFormat, SummonerId } from '../types';
import { Summoner } from '../apiClasses';

export class SpectatorClient extends ChildClient {
    /**
     *
     * @param {AnySummonerFormat} summoner
     * @link https://developer.riotgames.com/apis#spectator-v4/GET_getCurrentGameInfoBySummoner
     * @return {Promise<CurrentGameInfo>}
     */
    public async activeGamesBySummoner(
        summoner: SummonerId
    ): Promise<CurrentGameInfo> {
        const encryptedSummonerId = Summoner.id(summoner);
        return this.client.doRequest({
            url: `lol/spectator/v4/active-games/by-summoner/${encryptedSummonerId}`
        });
    }

    /**
     * @link https://developer.riotgames.com/apis#spectator-v4/GET_getFeaturedGames
     * @return {Promise<FeaturedGames>}
     */
    public async featuredGames(): Promise<FeaturedGames> {
        return this.doRequest({
            url: '/lol/spectator/v4/featured-games'
        });
    }
}
