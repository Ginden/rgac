import { Summoner } from '../apiClasses';
import { LeagueEntryDTO } from '../apiInterfaces/scrappedFromDocs/LeagueEntryDTO';
import { LeagueListDTO } from '../apiInterfaces/scrappedFromDocs/LeagueListDTO';
import { RankedDivision } from '../apiInterfaces/manual/RankedDivision';
import { RankedQueue } from '../apiInterfaces/manual/RankedQueue';
import { RankedTier } from '../apiInterfaces/manual/RankedTier';
import { ChildClient } from '../ChildClient';
import { AnySummonerFormat, WithNextPage } from '../types';

export class LeagueClient extends ChildClient {
    async challengerLeagues(queue: RankedQueue): Promise<LeagueListDTO> {
        return this.client.doRequest({
            url: `/lol/league/v4/challengerleagues/by-queue/${queue}`
        });
    }

    async entriesBySummoner(
        summoner: AnySummonerFormat
    ): Promise<LeagueEntryDTO[]> {
        const summonerId: string = Summoner.accountId(summoner);
        return this.client.doRequest({
            url: `/lol/league/v4/entries/by-summoner/${summonerId}`
        });
    }

    public async entries(
        queue: RankedQueue,
        tier: RankedTier,
        division: RankedDivision,
        page: number = 1
    ): Promise<WithNextPage<LeagueEntryDTO[]>> {
        return this.client.leagueOfLegends.leagueExp.entries(
            queue,
            tier,
            division,
            page
        );
    }

    public async grandmasterLeagues(
        queue: RankedQueue
    ): Promise<LeagueListDTO> {
        return this.client.doRequest({
            url: `/lol/league/v4/grandmasterleagues/by-queue/${queue}`
        });
    }

    public async masterLeagues(queue: RankedQueue): Promise<LeagueListDTO> {
        return this.client.doRequest({
            url: `/lol/league/v4/masterleagues/by-queue/${queue}`
        });
    }

    public async league(id: string): Promise<LeagueListDTO> {
        return this.client.doRequest({
            url: `/lol/league/v4/leagues/${id}`
        });
    }
}
