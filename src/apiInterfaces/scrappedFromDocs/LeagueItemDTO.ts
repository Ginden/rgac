import { MiniSeriesDTO } from './MiniSeriesDTO';
import { RankedDivision } from '../manual/RankedDivision';

export interface LeagueItemDTO {
    summonerName: string;
    summonerId: string;
    hotStreak: boolean;
    miniSeries?: MiniSeriesDTO;
    wins: number;
    veteran: boolean;
    losses: number;
    rank: RankedDivision;
    inactive: boolean;
    freshBlood: boolean;
    leaguePoints: number;
}
