import { Match } from '../apiClasses/Match';
import { ChildClient } from '../ChildClient';
import {
    AnySummonerFormat,
    AnyMatchFormat,
    MatchFilterObject,
    WithNextPage
} from '../types';
import { MatchDto } from '../apiInterfaces';
import { Summoner } from '../apiClasses';
import { MatchlistDto } from '../apiInterfaces/scrappedFromDocs/MatchlistDto';
import { MatchTimelineDto } from '../apiInterfaces/scrappedFromDocs/MatchTimelineDto';

export class MatchClient extends ChildClient {
    async get(match: AnyMatchFormat): Promise<Match> {
        const matchId: number = Match.id(match);
        const matchDto: MatchDto = await this.client.doRequest({
            url: `/lol/match/v4/matches/${matchId}`
        });
        return new Match(this.client, matchDto);
    }

    async listBySummoner(
        summoner: AnySummonerFormat,
        filter?: MatchFilterObject
    ): Promise<WithNextPage<MatchlistDto>> {
        const encryptedAccountId: string = Summoner.accountId(summoner);
        const newFilter: MatchFilterObject = {
            beginIndex: 0,
            ...Object(filter)
        };
        if (!newFilter.endIndex) {
            newFilter.endIndex = Number(newFilter.beginIndex) + 100;
        }
        const matchlistDto: MatchlistDto = await this.client.doRequest({
            url: `/lol/match/v4/matchlists/by-account/${encryptedAccountId}`
        });
        return {
            data: matchlistDto,
            getNextPage: async () => {
                const pageSize =
                    Number(newFilter.endIndex) - Number(newFilter.beginIndex);
                return this.listBySummoner(summoner, {
                    ...newFilter,
                    beginIndex: Number(newFilter.beginIndex) + pageSize,
                    endIndex: Number(newFilter.endIndex) + pageSize
                });
            }
        };
    }

    async timeline(match: AnyMatchFormat): Promise<MatchTimelineDto> {
        const matchId: number = Match.id(match);
        return this.client.doRequest({
            url: `/lol/match/v4/timelines/by-match/${matchId}`
        });
    }

    async getForTournamentCode(code: string): Promise<never> {
        throw new Error('TBA');
    }

    async getForMatchAndTournament(
        match: AnyMatchFormat,
        code: string
    ): Promise<never> {
        throw new Error('TBA');
    }
}
