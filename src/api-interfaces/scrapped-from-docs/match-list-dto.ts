import { ChampionId } from '..';
import { GameQueue } from '..';
import { Season } from '..';

export interface MatchlistDto {
    matches: MatchReferenceDto[];
    totalGames: number;
    startIndex: number;
    endIndex: number;
}

export interface MatchReferenceDto {
    lane: string;
    gameId: number;
    champion: ChampionId;
    platformId: string;
    season: Season;
    queue: GameQueue;
    role: string;
    timestamp: number;
}
