import { MiniSeriesDTO } from './mini-series-dto';
import { RankedDivision } from '..';
import { RankedQueue } from '..';
import { RankedTier } from '..';

export interface LeagueEntryDTO {
    leagueId: string;
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
