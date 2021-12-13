import { RankedQueue, RankedTier } from '..';
import { LeagueItemDTO } from './league-item-dto';

export interface LeagueListDTO {
    leagueId?: string;
    tier: RankedTier;
    entries: LeagueItemDTO[];
    queue: RankedQueue;
    name: string;
}
