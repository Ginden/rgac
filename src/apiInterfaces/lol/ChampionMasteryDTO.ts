import { ChampionId } from '..';

export interface ChampionMasteryDTO {
    chestGranted: boolean;
    championLevel: number;
    championPoints: number;
    championId: ChampionId;
}
