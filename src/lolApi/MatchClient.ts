import { Match } from '../apiClasses/Match';
import { ChildClient } from '../ChildClient';
import { AccountId, AnyMatchFormat, AnySummonerFormat, MatchFilterObject, WithNextPage } from '../types';
import { MatchDto, MatchlistDto, MatchTimelineDto } from '../apiInterfaces';
import { Summoner } from '../apiClasses';

export class MatchClient extends ChildClient {
    /**
     * Get match by match ID.
     * @link https://developer.riotgames.com/apis#match-v4/GET_getMatch
     * @param {AnyMatchFormat} match
     * @return {Promise<Match>}
     */
    public async get(match: AnyMatchFormat): Promise<Match> {
        const matchId: number = Match.id(match);
        const matchDto: MatchDto = await this.doRequest(`/lol/match/v4/matches/${matchId}`);
        return new Match(this.client, matchDto);
    }

    /**
     * Get matchlist for games played on given account ID and platform ID
     *  and filtered using given filter parameters, if any.
     * @link https://developer.riotgames.com/apis#match-v4/GET_getMatchlist
     * @param {AnySummonerFormat} summoner
     * @param {MatchFilterObject} [filter]
     * @return {Promise<WithNextPage<MatchlistDto>>}
     */
    public async listBySummoner(summoner: AccountId, filter?: MatchFilterObject): Promise<WithNextPage<MatchlistDto>> {
        const encryptedAccountId: string = Summoner.accountId(summoner);
        const newFilter: MatchFilterObject = {
            beginIndex: 0,
            ...Object(filter),
        };
        if (!newFilter.endIndex) {
            newFilter.endIndex = Number(newFilter.beginIndex) + 100;
        }
        const matchlistDto: MatchlistDto = await this.doRequest(
            `/lol/match/v4/matchlists/by-account/${encryptedAccountId}`
        );
        return {
            data: matchlistDto,
            getNextPage: async () => {
                const pageSize = Number(newFilter.endIndex) - Number(newFilter.beginIndex);
                return this.listBySummoner(summoner, {
                    ...newFilter,
                    beginIndex: Number(newFilter.beginIndex) + pageSize,
                    endIndex: Number(newFilter.endIndex) + pageSize,
                });
            },
        };
    }

    /**
     * Get match timeline by match ID.
     * @link https://developer.riotgames.com/apis#match-v4/GET_getMatchTimeline
     * @param {AnyMatchFormat} match
     * @return {Promise<MatchTimelineDto>}
     */
    public async timeline(match: AnyMatchFormat): Promise<MatchTimelineDto> {
        const matchId: number = Match.id(match);
        return this.doRequest(`/lol/match/v4/timelines/by-match/${matchId}`);
    }

    /**
     * Get match IDs by tournament code.
     * @link https://developer.riotgames.com/apis#match-v4/GET_getMatchIdsByTournamentCode
     * @param {string} tournamentCode
     * @return {Promise<number[]>}
     */
    public async getForTournamentCode(tournamentCode: string): Promise<number[]> {
        return this.doRequest(`/lol/match/v4/matches/by-tournament-code/${tournamentCode}/ids`);
    }

    /**
     * Get match by match ID and tournament code.
     * @link https://developer.riotgames.com/apis#match-v4/GET_getMatchByTournamentCode
     * @param {AnyMatchFormat} match
     * @param {string} tournamentCode
     * @return {Promise<Match>}
     */
    public async getForMatchAndTournament(match: AnyMatchFormat, tournamentCode: string): Promise<Match> {
        const matchId: number = Match.id(match);
        const matchDto: MatchDto = await this.doRequest(
            `/lol/match/v4/matches/${matchId}/by-tournament-code/${tournamentCode} `
        );
        return new Match(this.client, matchDto);
    }
}
