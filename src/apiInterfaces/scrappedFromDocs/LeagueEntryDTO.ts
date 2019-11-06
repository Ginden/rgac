import { MiniSeriesDTO } from './MiniSeriesDTO';
import { RankedDivision } from '../manual/RankedDivision';
import { RankedQueue } from '../manual/RankedQueue';
import { RankedTier } from '../manual/RankedTier';

export interface LeagueEntryDTO {
    queueType: RankedQueue;
    summonerName: string;
    summonerId: string;
    hotStreak: boolean;
    wins: number;
    veteran: boolean;
    losses: number;
    rank: RankedDivision;
    tier: RankedTier;
    inactive: boolean;
    freshBlood: boolean;
    leaguePoints: number;
    miniSeries?: MiniSeriesDTO;
}
