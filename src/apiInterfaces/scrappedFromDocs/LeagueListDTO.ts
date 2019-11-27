import { RankedQueue, RankedTier } from '..';
import { LeagueItemDTO } from './LeagueItemDTO';

export interface LeagueListDTO {
    leagueId: string;
    tier: RankedTier;
    entries: LeagueItemDTO[];
    queue: RankedQueue;
    name: string;
}
