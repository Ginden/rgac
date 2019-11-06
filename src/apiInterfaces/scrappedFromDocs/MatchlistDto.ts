import { ChampionId } from '../generated/champions';
import { GameQueue } from '../generated/gameQueues';
import { Season } from '../generated/seasons';

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
