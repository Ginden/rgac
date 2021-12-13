import { Summoner } from '../api-classes';
import { ChampionId, ChampionMasteryDTO } from '../api-interfaces';
import { ChildClient } from '../ChildClient';
import { AnySummonerFormat, SummonerId } from '../types';

export class ChampionMasteriesClient extends ChildClient {
    /**
     * Get all champion mastery entries sorted by number of champion points descending.
     * @link https://developer.riotgames.com/apis#champion-mastery-v4/GET_getAllChampionMasteries
     * @param {AnySummonerFormat} summoner
     * @return {Promise<ChampionMasteryDTO[]>}
     */
    public async bySummoner(summoner: SummonerId): Promise<ChampionMasteryDTO[]> {
        const accountId: string = Summoner.id(summoner);
        return this.doRequest(`lol/champion-mastery/v4/champion-masteries/by-summoner/${accountId}`);
    }

    /**
     * Get a champion mastery by player ID and champion ID.
     * @link https://developer.riotgames.com/apis#champion-mastery-v4/GET_getChampionMastery
     * @param {AnySummonerFormat} summoner
     * @param {ChampionId} champion
     * @return {Promise<ChampionMasteryDTO>}
     */

    public async bySummonerAndChampion(summoner: SummonerId, champion: ChampionId): Promise<ChampionMasteryDTO> {
        const encryptedSummonerId: string = Summoner.id(summoner);
        return this.client.doRequest(
            `lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}/by-champion/${champion}`
        );
    }

    /**
     * Get a player's total champion mastery score, which is the sum of individual champion mastery levels.
     * @link https://developer.riotgames.com/apis#champion-mastery-v4/GET_getChampionMasteryScore
     * @param {AnySummonerFormat} summoner
     * @return {Promise<number>}
     */
    public async scoresBySummoner(summoner: AnySummonerFormat): Promise<number> {
        const accountId: string = Summoner.id(summoner);
        return this.doRequest(`lol/champion-mastery/v4/scores/by-summoner/${accountId}/`);
    }
}
