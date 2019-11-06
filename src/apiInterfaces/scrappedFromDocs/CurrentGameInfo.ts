import { ChampionId } from '../generated/champions';

export interface CurrentGameInfo {
    gameId: number;
    gameStartTime: number;
    platformId: string;
    gameMode: string;
    mapId: number;
    gameType: string;
    bannedChampions: CurrentGameInfoBannedChampion[];
    observers: CurrentGameInfoObserver;
    participants: CurrentGameParticipant;
    gameLength: number;
    gameQueueConfigId: number;
}

export interface CurrentGameInfoBannedChampion {
    pickTurn: number;
    championId: ChampionId;
    teamId: number;
}

export interface CurrentGameInfoObserver {
    encryptionKey: string;
}

export interface CurrentGameParticipant {
    profileIconId: number;
    championId: ChampionId;
    summonerName: string;
    gameCustomizationObjects: CurrentGameInfoGameCustomizationObject[];
    bot: boolean;
    perks: CurrentGameInfoPerks;
    spell1Id: number;
    spell2Id: number;
    teamId: number;
    summonerId: string;
}

export interface CurrentGameInfoGameCustomizationObject {
    category: string;
    content: string;
}

export interface CurrentGameInfoPerks {
    perkStyle: number;
    perkIds: number[];
    perkSubStyle: number;
}
