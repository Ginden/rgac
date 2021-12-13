import { ChampionId } from '..';

export interface ChampionInfo {
    freeChampionIdsForNewPlayers: ChampionId[];
    freeChampionIds: ChampionId[];
    maxNewPlayerLevel: number;
}
