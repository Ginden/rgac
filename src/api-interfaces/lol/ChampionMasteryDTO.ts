import { ChampionId } from '..';

export interface ChampionMasteryDTO {
    chestGranted: boolean;
    championLevel: number;
    championPoints: number;
    championId: ChampionId;
    championPointsSinceLastLevel: number;
    championPointsUntilNextLevel: number;
    tokensEarned: number;
    lastPlayTime?: number;
    summonerId?: string;
}
