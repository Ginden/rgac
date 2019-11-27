import { Summoner } from '../apiClasses';

import {
    LeagueEntryDTO,
    LeagueListDTO,
    RankedDivision,
    RankedQueue,
    RankedTier
} from '../apiInterfaces';

import { ChildClient } from '../ChildClient';
import { AccountId, WithNextPage } from '../types';

export class LeagueClient extends ChildClient {
    /**
     * Get the challenger league for given queue.
     * @link https://developer.riotgames.com/apis#league-v4/GET_getChallengerLeague
     * @param {RankedQueue} queue
     * @return {Promise<LeagueListDTO>}
     */
    public async challengerLeagues(queue: RankedQueue): Promise<LeagueListDTO> {
        return this.doRequest({
            url: `/lol/league/v4/challengerleagues/by-queue/${queue}`
        });
    }

    /**
     * Get league entries in all queues for a given summoner ID.
     * @link https://developer.riotgames.com/apis#league-v4/GET_getLeagueEntriesForSummoner
     * @param {AccountId} summoner
     * @return {Promise<LeagueEntryDTO[]>}
     */
    public async entriesBySummoner(
        summoner: AccountId
    ): Promise<LeagueEntryDTO[]> {
        const summonerId: string = Summoner.accountId(summoner);
        return this.doRequest({
            url: `/lol/league/v4/entries/by-summoner/${summonerId}`
        });
    }

    /**
     * Get all the league entries.
     * @link https://developer.riotgames.com/apis#league-v4/GET_getLeagueEntries
     * @param {RankedQueue} queue
     * @param {RankedTier} tier
     * @param {RankedDivision} division
     * @param {number} [page]
     * @return {Promise<WithNextPage<LeagueEntryDTO[]>>}
     */
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

    /**
     * Get the grandmaster league of a specific queue.
     * @link https://developer.riotgames.com/apis#league-v4/GET_getGrandmasterLeague
     * @param {RankedQueue} queue
     * @return {Promise<LeagueListDTO>}
     */
    public async grandmasterLeagues(
        queue: RankedQueue
    ): Promise<LeagueListDTO> {
        return this.doRequest({
            url: `/lol/league/v4/grandmasterleagues/by-queue/${queue}`
        });
    }

    /**
     * Get the master league for given queue
     * @link https://developer.riotgames.com/apis#league-v4/GET_getMasterLeague
     * @param {RankedQueue} queue
     * @return {Promise<LeagueListDTO>}
     */
    public async masterLeagues(queue: RankedQueue): Promise<LeagueListDTO> {
        return this.doRequest({
            url: `/lol/league/v4/masterleagues/by-queue/${queue}`
        });
    }

    /**
     * Get league with given ID, including inactive entries.
     * @link https://developer.riotgames.com/apis#league-v4/GET_getLeagueById
     * @param {string} id
     * @return {Promise<LeagueListDTO>}
     */
    public async byId(id: string): Promise<LeagueListDTO> {
        return this.doRequest({
            url: `/lol/league/v4/leagues/${id}`
        });
    }
}
