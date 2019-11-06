import { Summoner } from '../apiClasses';
import { ChildClient } from '../ChildClient';
import { AnySummonerFormat } from '../types';

export class SummonerClient extends ChildClient {
    async byAccount(summoner: AnySummonerFormat): Promise<Summoner> {
        const encryptedAccountId: string = Summoner.accountId(summoner);
        const data = await this.client.doRequest({
            url: `/lol/summoner/v4/summoners/by-account/${encryptedAccountId}`
        });
        return new Summoner(this.client, data);
    }

    async byName(summoner: AnySummonerFormat): Promise<Summoner> {
        const name: string = Summoner.getName(summoner);
        const data = await this.client.doRequest({
            url: `/lol/summoner/v4/summoners/by-name/${name}`
        });
        return new Summoner(this.client, data);
    }

    async byPuuid(summoner: AnySummonerFormat): Promise<Summoner> {
        const puuid: string = Summoner.puuid(summoner);
        const data = await this.client.doRequest({
            url: `/lol/summoner/v4/summoners/by-puuid/${puuid}`
        });
        return new Summoner(this.client, data);
    }

    async bySummonerId(summoner: AnySummonerFormat): Promise<Summoner> {
        const encryptedSummonerId: string = Summoner.id(summoner);
        const data = await this.client.doRequest({
            url: `/lol/summoner/v4/summoners/${encryptedSummonerId}`
        });
        return new Summoner(this.client, data);
    }
}
