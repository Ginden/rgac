import { TftLeagueListDTO } from '../apiInterfaces';
import { ChildClient } from '../ChildClient';

export class TftLeagueClient extends ChildClient {
    public challenger(): Promise<TftLeagueListDTO> {
        return this.doRequest(`/tft/league/v1/challenger`);
    }

    public summonerEntries(): never {
        throw new Error('Not implemented');
    }

    public leagueEntries(): Promise<never & TftLeagueListDTO> {
        throw new Error('Not implemented');
    }

    public grandmaster(): Promise<TftLeagueListDTO> {
        return this.doRequest(`/tft/league/v1/grandmaster`);
    }

    public getById(): Promise<never & TftLeagueListDTO> {
        throw new Error('Not implemented');
    }

    public master(): Promise<TftLeagueListDTO> {
        return this.doRequest(`/tft/league/v1/master`);
    }
}
