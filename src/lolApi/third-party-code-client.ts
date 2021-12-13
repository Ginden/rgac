import { Summoner } from '../api-classes';
import { ChildClient } from '../child-client';
import { SummonerId } from '../types';

export class ThirdPartyCodeClient extends ChildClient {
    public async bySummoner(summoner: SummonerId): Promise<string> {
        const encryptedSummonerId: string = Summoner.id(summoner);
        return this.doRequest(`/lol/platform/v4/third-party-code/by-summoner/${encryptedSummonerId}`);
    }
}