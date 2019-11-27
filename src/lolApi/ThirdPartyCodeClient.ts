import { Summoner } from '../apiClasses';
import { ChildClient } from '../ChildClient';
import { SummonerId } from '../types';

export class ThirdPartyCodeClient extends ChildClient {
    public async bySummoner(summoner: SummonerId): Promise<string> {
        const encryptedSummonerId: string = Summoner.id(summoner);
        return this.doRequest({
            url: `/lol/platform/v4/third-party-code/by-summoner/${encryptedSummonerId}`
        });
    }
}
