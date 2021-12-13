import { Summoner, TftSummoner } from '../api-classes';
import { ChildClient } from '../ChildClient';
import { SummonerClient } from '../lolApi';
import { AccountId, AnySummonerFormat, Puuid, SummonerId } from '../types';

export class TftSummonerClient extends SummonerClient {
    /**
     * Get a summoner by account ID.
     * @link https://developer.riotgames.com/apis#tft-summoner-v1/GET_getByAccountId
     * @param {AccountId} summoner
     * @return {Promise<Summoner>}
     */
    public async byAccount(summoner: AccountId): Promise<TftSummoner> {
        const encryptedAccountId: string = TftSummoner.accountId(summoner);
        const data = await this.doRequest({
            url: `/tft/summoner/v1/summoners/by-account/${encryptedAccountId}`,
        });
        return new TftSummoner(this.client, data);
    }

    /**
     * Get a summoner by summoner name.
     * @link https://developer.riotgames.com/apis#tft-summoner-v1/GET_getBySummonerName
     * @param {AnySummonerFormat} summoner
     * @return {Promise<Summoner>}
     */
    public async byName(summoner: AnySummonerFormat): Promise<TftSummoner> {
        const name: string = TftSummoner.getName(summoner);
        const data = await this.doRequest({
            url: `/tft/summoner/v1/summoners/by-name/${name}`,
        });
        return new TftSummoner(this.client, data);
    }

    /**
     * Get a summoner by PUUID.
     * @link https://developer.riotgames.com/apis#tft-summoner-v1/GET_getByPUUID
     * @param {Puuid} summoner
     * @return {Promise<Summoner>}
     */
    public async byPuuid(summoner: Puuid): Promise<TftSummoner> {
        const puuid: string = TftSummoner.puuid(summoner);
        const data = await this.doRequest({
            url: `/tft/summoner/v1/summoners/by-puuid/${puuid}`,
        });
        return new TftSummoner(this.client, data);
    }

    /**
     * Get a summoner by summoner ID.
     * @link https://developer.riotgames.com/apis#tft-summoner-v1/GET_getBySummonerId
     * @param {SummonerId} summoner
     * @return {Promise<Summoner>}
     */
    public async bySummonerId(summoner: SummonerId): Promise<TftSummoner> {
        const encryptedSummonerId: string = TftSummoner.id(summoner);
        const data = await this.doRequest({
            url: `/tft/summoner/v1/summoners/${encryptedSummonerId}`,
        });
        return new TftSummoner(this.client, data);
    }
}
