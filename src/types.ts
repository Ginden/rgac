import { Summoner, Match } from './apiClasses';
import { ApiSummonerInfo, ChampionId, GameQueue, MatchDto, Season } from './apiInterfaces';

/**
 * Any summoner format is allowed. Passing strings is discouraged, because it's prone to errors (summonerId/accoundId/puuid etc.)
 */
export type AnySummonerFormat = string | Summoner | ApiSummonerInfo;
/**
 * Certain API responses use "summonerId" field. These objects can be directly used by other methods.
 */
export type SummonerId = AnySummonerFormat | { summonerId: string };
/**
 * Certain API responses use "accountId" field. These objects can be directly used by other methods.
 */
export type AccountId = AnySummonerFormat | { accountId: string };
export type Puuid = AnySummonerFormat | { puuid: string };

export type ClashTeam = { teamId: string } | string;

export type ClashTournament = { id: number } | number;

/**
 * This is internal type for pagination. It will be replaced with AsyncIterables in future.
 */
export type WithNextPage<T> = {
    data: T;
    getNextPage(): Promise<WithNextPage<T>>;
};

export type AnyMatchFormat = number | Match | MatchDto | { gameId: number };

export type MatchFilterObject = {
    champion?: ChampionId;
    queue?: GameQueue;
    season?: Season;
    beginTime?: number;
    endTime?: number;
    beginIndex?: number;
    endIndex?: number;
};
