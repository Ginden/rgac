import { ChampionId } from '..';
import { GameMode } from '..';
import { GameQueue } from '..';
import { GameType } from '..';
import { Season } from '..';
import { Map } from '..';
import { Team } from '..';
import { WinString } from '..';

export type Dictionary<T> = {
    [K: string]: T;
};

export interface MatchDto {
    seasonId: Season;
    queueId: GameQueue;
    gameId: number;
    participantIdentities: ParticipantIdentityDto[];
    participants: ParticipantDto[];
    gameVersion: string;
    gameMode: GameMode;
    mapId: Map;
    gameType: GameType;
    teams: TeamStatsDto[];
    gameDuration: number;
    gameCreation: number;
}

export interface ParticipantIdentityDto {
    player: PlayerDTO;
    participantId: number;
}

export interface ParticipantDto {
    stats: ParticipantStatsDto;
    participantId: number;
    runes?: RuneDto[];
    timeline: ParticipantTimelineDto;
    teamId: Team;
    spell2Id: number;
    spell1Id: number;
    championId: ChampionId;
    masteries?: MasteryDto[];
    highestAchievedSeasonTier?: string;
}

export interface RuneDto {
    runeId: number;
    rank: number;
}

export interface MasteryDto {
    masteryId: number;
    rank: number;
}

export interface ParticipantStatsDto {
    altarsNeutralized?: number;
    assists: number;
    combatPlayerScore: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    deaths: number;
    firstBloodAssist: boolean;
    firstBloodKill: boolean;
    firstInhibitorAssist: boolean;
    firstInhibitorKill: boolean;
    goldEarned: number;
    goldSpent: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    killingSprees: number;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    largestMultiKill: number;
    longestTimeSpentLiving: number;
    magicalDamageTaken: number;
    magicDamageDealt: number;
    magicDamageDealtToChampions: number;
    neutralMinionsKilled: number;
    neutralMinionsKilledEnemyJungle: number;
    neutralMinionsKilledTeamJungle: number;
    nodeCapture?: number;
    nodeNeutralize?: number;
    nodeNeutralizeAssist?: number;
    objectivePlayerScore: number;
    participantId: number;
    pentaKills: number;
    perk0Var1: number;
    perk0Var2: number;
    perk0Var3: number;
    perk1: number;
    perk1Var1: number;
    perk1Var2: number;
    perk1Var3: number;
    perk2: number;
    perk2Var1: number;
    perk2Var2: number;
    perk2Var3: number;
    perk3: number;
    perk3Var1: number;
    perk3Var2: number;
    perk3Var3: number;
    perk4: number;
    perk4Var1: number;
    perk4Var2: number;
    perk4Var3: number;
    perk5: number;
    perk5Var1: number;
    perk5Var2: number;
    perk5Var3: number;
    perkPrimaryStyle: number;
    perkSubStyle: number;
    physicalDamageDealt: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    playerScore0: number;
    playerScore1: number;
    playerScore2: number;
    playerScore3: number;
    playerScore4: number;
    playerScore5: number;
    playerScore6: number;
    playerScore7: number;
    playerScore8: number;
    playerScore9: number;
    quadraKills: number;
    sightWardsBoughtInGame: number;
    teamObjective?: number;
    timeCCingOthers: number;
    totalDamageDealt: number;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    totalHeal: number;
    totalMinionsKilled: number;
    totalPlayerScore: number;
    totalScoreRank: number;
    totalTimeCrowdControlDealt: number;
    totalUnitsHealed: number;
    kills: number;
    doubleKills: number;
    tripleKills: number;
    inhibitorKills: number;
    champLevel: number;
    firstTowerKill: boolean;
    firstTowerAssist: boolean;
    perk0: number;
    statPerk0: number;
    statPerk1: number;
    statPerk2: number;
    trueDamageDealt: number;
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    turretKills: number;
    unrealKills: number;
    visionScore: number;
    visionWardsBoughtInGame: number;
    wardsKilled: number;
    wardsPlaced: number;
    win: boolean;
}

export interface PlayerDTO {
    currentPlatformId: string;
    summonerName: string;
    matchHistoryUri: string;
    platformId: string;
    currentAccountId: string;
    profileIcon: number;
    summonerId: string;
    accountId: string;
}

export interface TeamStatsDto {
    firstDragon: boolean;
    firstInhibitor: boolean;
    bans?: TeamBansDto[];
    baronKills: number;
    firstRiftHerald: boolean;
    firstBaron: boolean;
    firstBlood: boolean;
    teamId: Team;
    firstTower: boolean;
    vilemawKills: number;
    inhibitorKills: number;
    towerKills: number;
    dominionVictoryScore: number;
    win: WinString;
    dragonKills?: number;
    riftHeraldKills?: number;
}

export interface TeamBansDto {
    pickTurn: number;
    championId: ChampionId;
}

export interface ParticipantTimelineDto {
    lane: string;
    participantId: number;
    csDiffPerMinDeltas?: Dictionary<number>;
    goldPerMinDeltas: Dictionary<number>;
    xpDiffPerMinDeltas?: Dictionary<number>;
    creepsPerMinDeltas: Dictionary<number>;
    xpPerMinDeltas: Dictionary<number>;
    role: string;
    damageTakenDiffPerMinDeltas?: Dictionary<number>;
    damageTakenPerMinDeltas: Dictionary<number>;
}
