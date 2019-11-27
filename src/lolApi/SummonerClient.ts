import { Summoner } from '../apiClasses';
import { ChildClient } from '../ChildClient';
import { AccountId, AnySummonerFormat, Puuid, SummonerId } from '../types';

export class SummonerClient extends ChildClient {
    /**
     * Get a summoner by account ID.
     * @link https://developer.riotgames.com/apis#summoner-v4/GET_getByAccountId
     * @param {AccountId} summoner
     * @return {Promise<Summoner>}
     */
    public async byAccount(summoner: AccountId): Promise<Summoner> {
        const encryptedAccountId: string = Summoner.accountId(summoner);
        const data = await this.doRequest({
            url: `/lol/summoner/v4/summoners/by-account/${encryptedAccountId}`
        });
        return new Summoner(this.client, data);
    }

    /**
     * Get a summoner by summoner name.
     * @link https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerName
     * @param {AnySummonerFormat} summoner
     * @return {Promise<Summoner>}
     */
    public async byName(summoner: AnySummonerFormat): Promise<Summoner> {
        const name: string = Summoner.getName(summoner);
        const data = await this.doRequest({
            url: `/lol/summoner/v4/summoners/by-name/${name}`
        });
        return new Summoner(this.client, data);
    }

    /**
     * Get a summoner by PUUID.
     * @link https://developer.riotgames.com/apis#summoner-v4/GET_getByPUUID
     * @param {Puuid} summoner
     * @return {Promise<Summoner>}
     */
    public async byPuuid(summoner: Puuid): Promise<Summoner> {
        const puuid: string = Summoner.puuid(summoner);
        const data = await this.doRequest({
            url: `/lol/summoner/v4/summoners/by-puuid/${puuid}`
        });
        return new Summoner(this.client, data);
    }

    /**
     * Get a summoner by summoner ID.
     * @link https://developer.riotgames.com/apis#summoner-v4/GET_getBySummonerId
     * @param {SummonerId} summoner
     * @return {Promise<Summoner>}
     */
    public async bySummonerId(summoner: SummonerId): Promise<Summoner> {
        const encryptedSummonerId: string = Summoner.id(summoner);
        const data = await this.doRequest({
            url: `/lol/summoner/v4/summoners/${encryptedSummonerId}`
        });
        return new Summoner(this.client, data);
    }
}
