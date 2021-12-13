import { MiniSeriesDTO } from './mini-series-dto';
import { RankedDivision } from '..';

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
