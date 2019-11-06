import { ChildClient } from '../ChildClient';
import { AnySummonerFormat } from '../types';

export class ThirdPartyCodeClient extends ChildClient {
    async bySummoner(summoner: AnySummonerFormat): Promise<never> {
        throw new Error('TBA');
    }
}
