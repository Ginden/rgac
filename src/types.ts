import { Summoner } from './apiClasses';
import {
    ApiSummonerInfo,
    ChampionId,
    GameQueue,
    MatchDto,
    Season
} from './apiInterfaces';
import { Match } from './apiClasses/Match';

export type AnySummonerFormat = string | Summoner | ApiSummonerInfo;

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
