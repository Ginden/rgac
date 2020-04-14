export interface TftLeagueListDTO {
    leagueId: string;
    tier: string;
    entries: TftLeagueItemDTO[];
    queue: string;
    name: string;
}

export interface TftLeagueItemDTO {
    summonerName: string;
    hotStreak: boolean;
    miniSeries: any;
    wins: number;
    veteran: boolean;
    losses: boolean;
    freshBlood: boolean;
    inactive: boolean;
    rank: string;
    summonerId: string;
    leaguePoints: number;
}
