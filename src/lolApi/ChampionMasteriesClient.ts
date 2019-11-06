import { Summoner } from '../apiClasses';
import { ChampionId } from '../apiInterfaces';
import { ChampionMasteryDTO } from '../apiInterfaces/lol/ChampionMasteryDTO';
import { ChildClient } from '../ChildClient';
import { AnySummonerFormat } from '../types';

export class ChampionMasteriesClient extends ChildClient {
    /**
     * @description Get all champion mastery entries sorted by number of champion points descending.
     * @link https://developer.riotgames.com/apis#champion-mastery-v4/GET_getAllChampionMasteries
     * @param {AnySummonerFormat} summoner
     * @return {Promise<ChampionMasteryDTO[]>}
     */
    public async bySummoner(
        summoner: AnySummonerFormat
    ): Promise<ChampionMasteryDTO[]> {
        const accountId: string = Summoner.accountId(summoner);
        return this.client.doRequest({
            url: `lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}`
        });
    }

    /**
     * @description Get a champion mastery by player ID and champion ID.
     * @link https://developer.riotgames.com/apis#champion-mastery-v4/GET_getChampionMastery
     * @param {AnySummonerFormat} summoner
     * @param {ChampionId} champion
     * @return {Promise<ChampionMasteryDTO>}
     */

    public async bySummonerAndChampion(
        summoner: AnySummonerFormat,
        champion: ChampionId
    ): Promise<ChampionMasteryDTO> {
        const accountId: string = Summoner.accountId(summoner);
        return this.client.doRequest({
            url: `lol/champion-mastery/v4/scores/champion-masteries/by-summoner/${accountId}/by-champion/${champion}`
        });
    }

    /**
     * @description Get a player's total champion mastery score, which is the sum of individual champion mastery levels.
     * @link https://developer.riotgames.com/apis#champion-mastery-v4/GET_getChampionMasteryScore
     * @param {AnySummonerFormat} summoner
     * @return {Promise<number>}
     */
    public async scoresBySummoner(
        summoner: AnySummonerFormat
    ): Promise<number> {
        const accountId: string = Summoner.accountId(summoner);
        return this.client.doRequest({
            url: `lol/champion-mastery/v4/scores/${accountId}/`
        });
    }
}
