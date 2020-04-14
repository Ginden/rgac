import { ChildClient } from '../ChildClient';
import { TftMatchDto } from '../apiInterfaces';
import { Summoner } from '../apiClasses';
import { Puuid } from '../types';

export class TftMatchClient extends ChildClient {
    public listBySummoner(summoner: Puuid): Promise<string[]> {
        const puuid: string = Summoner.puuid(summoner);
        return this.doRequest(`/tft/match/v1/matches/by-puuid/${puuid}/ids`, 'region');
    }

    public details(matchId: string): Promise<TftMatchDto> {
        return this.doRequest(`/tft/match/v1/matches/${matchId}`, 'region');
    }
}
