import Joi = require('@hapi/joi');
import { J, enumSchema, referenceSchema } from './helpers';
import {
    ChampionId,
    RankedQueue,
    RankedDivision,
    RankedTier,
    Season,
    GameQueue,
    GameMode,
    Map,
    GameType,
    Team,
    WinString
} from '../apiInterfaces';

/**
 * @ignore
 */

export const ChampionInfoSchema: Joi.ObjectSchema = J.object({
    freeChampionIdsForNewPlayers: J.array()
        .items(enumSchema(ChampionId))
        .required(),
    freeChampionIds: J.array()
        .items(enumSchema(ChampionId))
        .required(),
    maxNewPlayerLevel: J.number().required()
}).id('ChampionInfo');

/**
 * @ignore
 */

export const ChampionMasteryDTOSchema: Joi.ObjectSchema = J.object({
    chestGranted: J.boolean().required(),
    championLevel: J.number().required(),
    championPoints: J.number().required(),
    championId: enumSchema(ChampionId).required(),
    championPointsSinceLastLevel: J.number().required(),
    championPointsUntilNextLevel: J.number().required(),
    tokensEarned: J.number().required(),
    lastPlayTime: J.number()
        .allow(null)
        .optional(),
    summonerId: J.string()
        .allow('')
        .allow(null)
        .optional()
}).id('ChampionMasteryDTO');

/**
 * @ignore
 */

export const ApiSummonerInfoSchema: Joi.ObjectSchema = J.object({
    id: J.string()
        .allow('')
        .required(),
    accountId: J.string()
        .allow('')
        .required(),
    puuid: J.string()
        .allow('')
        .required(),
    name: J.string()
        .allow('')
        .required(),
    profileIconId: J.number().required(),
    revisionDate: J.number().required(),
    summonerLevel: J.number().required()
}).id('ApiSummonerInfo');

/**
 * @ignore
 */

export const DataDragonChampionInfoSchema: Joi.ObjectSchema = J.object({
    version: J.string()
        .allow('')
        .required(),
    id: J.string()
        .allow('')
        .required(),
    key: J.string()
        .allow('')
        .required(),
    name: J.string()
        .allow('')
        .required(),
    title: J.string()
        .allow('')
        .required(),
    blurb: J.string()
        .allow('')
        .required(),
    info: J.any().required(),
    image: J.any().required(),
    tags: J.array()
        .items(J.string().allow(''))
        .required(),
    partype: J.string()
        .allow('')
        .required(),
    stats: J.any().required()
}).id('DataDragonChampionInfo');

/**
 * @ignore
 */

export const CurrentGameInfoSchema: Joi.ObjectSchema = J.object({
    gameId: J.number().required(),
    gameStartTime: J.number().required(),
    platformId: J.string()
        .allow('')
        .required(),
    gameMode: J.string()
        .allow('')
        .required(),
    mapId: J.number().required(),
    gameType: J.string()
        .allow('')
        .required(),
    bannedChampions: J.array()
        .items(referenceSchema(() => CurrentGameInfoBannedChampionSchema))
        .required(),
    observers: referenceSchema(() => CurrentGameInfoObserverSchema).required(),
    participants: J.array()
        .items(referenceSchema(() => CurrentGameParticipantSchema))
        .required(),
    gameLength: J.number().required(),
    gameTypeConfigId: J.number()
        .allow(null)
        .optional(),
    gameQueueConfigId: J.number().required()
}).id('CurrentGameInfo');

/**
 * @ignore
 */

export const CurrentGameInfoBannedChampionSchema: Joi.ObjectSchema = J.object({
    pickTurn: J.number().required(),
    championId: enumSchema(ChampionId).required(),
    teamId: J.number().required()
}).id('CurrentGameInfoBannedChampion');

/**
 * @ignore
 */

export const CurrentGameInfoObserverSchema: Joi.ObjectSchema = J.object({
    encryptionKey: J.string()
        .allow('')
        .required()
}).id('CurrentGameInfoObserver');

/**
 * @ignore
 */

export const CurrentGameParticipantSchema: Joi.ObjectSchema = J.object({
    profileIconId: J.number().required(),
    championId: enumSchema(ChampionId).required(),
    summonerName: J.string()
        .allow('')
        .required(),
    gameCustomizationObjects: J.array()
        .items(
            referenceSchema(() => CurrentGameInfoGameCustomizationObjectSchema)
        )
        .allow(null)
        .optional(),
    bot: J.boolean().required(),
    perks: referenceSchema(() => CurrentGameInfoPerksSchema)
        .allow(null)
        .optional(),
    spell1Id: J.number().required(),
    spell2Id: J.number().required(),
    teamId: J.number().required(),
    skinIndex: J.number()
        .allow(null)
        .optional(),
    summonerId: J.string()
        .allow('')
        .allow(null)
        .optional()
}).id('CurrentGameParticipant');

/**
 * @ignore
 */

export const CurrentGameInfoGameCustomizationObjectSchema: Joi.ObjectSchema = J.object(
    {
        category: J.string()
            .allow('')
            .required(),
        content: J.string()
            .allow('')
            .required()
    }
).id('CurrentGameInfoGameCustomizationObject');

/**
 * @ignore
 */

export const CurrentGameInfoPerksSchema: Joi.ObjectSchema = J.object({
    perkStyle: J.number().required(),
    perkIds: J.array()
        .items(J.number())
        .required(),
    perkSubStyle: J.number().required()
}).id('CurrentGameInfoPerks');

/**
 * @ignore
 */

export const FeaturedGamesSchema: Joi.ObjectSchema = J.object({
    clientRefreshInterval: J.number().required(),
    gameList: J.array()
        .items(referenceSchema(() => CurrentGameInfoSchema))
        .required()
}).id('FeaturedGames');

/**
 * @ignore
 */

export const LeagueEntryDTOSchema: Joi.ObjectSchema = J.object({
    queueType: enumSchema(RankedQueue).required(),
    summonerName: J.string()
        .allow('')
        .required(),
    summonerId: J.string()
        .allow('')
        .required(),
    hotStreak: J.boolean().required(),
    wins: J.number().required(),
    veteran: J.boolean().required(),
    losses: J.number().required(),
    rank: enumSchema(RankedDivision).required(),
    tier: enumSchema(RankedTier).required(),
    inactive: J.boolean().required(),
    freshBlood: J.boolean().required(),
    leaguePoints: J.number().required(),
    miniSeries: referenceSchema(() => MiniSeriesDTOSchema)
        .allow(null)
        .optional()
}).id('LeagueEntryDTO');

/**
 * @ignore
 */

export const LeagueItemDTOSchema: Joi.ObjectSchema = J.object({
    summonerName: J.string()
        .allow('')
        .required(),
    summonerId: J.string()
        .allow('')
        .required(),
    hotStreak: J.boolean().required(),
    miniSeries: referenceSchema(() => MiniSeriesDTOSchema)
        .allow(null)
        .optional(),
    wins: J.number().required(),
    veteran: J.boolean().required(),
    losses: J.number().required(),
    rank: enumSchema(RankedDivision).required(),
    inactive: J.boolean().required(),
    freshBlood: J.boolean().required(),
    leaguePoints: J.number().required()
}).id('LeagueItemDTO');

/**
 * @ignore
 */

export const LeagueListDTOSchema: Joi.ObjectSchema = J.object({
    leagueId: J.string()
        .allow('')
        .required(),
    tier: enumSchema(RankedTier).required(),
    entries: J.array()
        .items(referenceSchema(() => LeagueItemDTOSchema))
        .required(),
    queue: enumSchema(RankedQueue).required(),
    name: J.string()
        .allow('')
        .required()
}).id('LeagueListDTO');

/**
 * @ignore
 */

export const MatchDtoSchema: Joi.ObjectSchema = J.object({
    seasonId: enumSchema(Season).required(),
    queueId: enumSchema(GameQueue).required(),
    gameId: J.number().required(),
    participantIdentities: J.array()
        .items(referenceSchema(() => ParticipantIdentityDtoSchema))
        .required(),
    participants: J.array()
        .items(referenceSchema(() => ParticipantDtoSchema))
        .required(),
    gameVersion: J.string()
        .allow('')
        .required(),
    gameMode: enumSchema(GameMode).required(),
    mapId: enumSchema(Map).required(),
    gameType: enumSchema(GameType).required(),
    teams: J.array()
        .items(referenceSchema(() => TeamStatsDtoSchema))
        .required(),
    gameDuration: J.number().required(),
    gameCreation: J.number().required()
}).id('MatchDto');

/**
 * @ignore
 */

export const ParticipantIdentityDtoSchema: Joi.ObjectSchema = J.object({
    player: referenceSchema(() => PlayerDTOSchema).required(),
    participantId: J.number().required()
}).id('ParticipantIdentityDto');

/**
 * @ignore
 */

export const ParticipantDtoSchema: Joi.ObjectSchema = J.object({
    stats: referenceSchema(() => ParticipantStatsDtoSchema).required(),
    participantId: J.number().required(),
    runes: J.array()
        .items(referenceSchema(() => RuneDtoSchema))
        .allow(null)
        .optional(),
    timeline: referenceSchema(() => ParticipantTimelineDtoSchema).required(),
    teamId: enumSchema(Team).required(),
    spell2Id: J.number().required(),
    spell1Id: J.number().required(),
    championId: enumSchema(ChampionId).required(),
    masteries: J.array()
        .items(referenceSchema(() => MasteryDtoSchema))
        .allow(null)
        .optional(),
    highestAchievedSeasonTier: J.string()
        .allow('')
        .allow(null)
        .optional()
}).id('ParticipantDto');

/**
 * @ignore
 */

export const RuneDtoSchema: Joi.ObjectSchema = J.object({
    runeId: J.number().required(),
    rank: J.number().required()
}).id('RuneDto');

/**
 * @ignore
 */

export const MasteryDtoSchema: Joi.ObjectSchema = J.object({
    masteryId: J.number().required(),
    rank: J.number().required()
}).id('MasteryDto');

/**
 * @ignore
 */

export const ParticipantStatsDtoSchema: Joi.ObjectSchema = J.object({
    altarsNeutralized: J.number()
        .allow(null)
        .optional(),
    assists: J.number().required(),
    combatPlayerScore: J.number().required(),
    damageDealtToObjectives: J.number().required(),
    damageDealtToTurrets: J.number().required(),
    damageSelfMitigated: J.number().required(),
    deaths: J.number().required(),
    firstBloodAssist: J.boolean().required(),
    firstBloodKill: J.boolean().required(),
    firstInhibitorAssist: J.boolean().required(),
    firstInhibitorKill: J.boolean().required(),
    goldEarned: J.number().required(),
    goldSpent: J.number().required(),
    item0: J.number().required(),
    item1: J.number().required(),
    item2: J.number().required(),
    item3: J.number().required(),
    item4: J.number().required(),
    item5: J.number().required(),
    item6: J.number().required(),
    killingSprees: J.number().required(),
    largestCriticalStrike: J.number().required(),
    largestKillingSpree: J.number().required(),
    largestMultiKill: J.number().required(),
    longestTimeSpentLiving: J.number().required(),
    magicalDamageTaken: J.number().required(),
    magicDamageDealt: J.number().required(),
    magicDamageDealtToChampions: J.number().required(),
    neutralMinionsKilled: J.number().required(),
    neutralMinionsKilledEnemyJungle: J.number().required(),
    neutralMinionsKilledTeamJungle: J.number().required(),
    nodeCapture: J.number()
        .allow(null)
        .optional(),
    nodeNeutralize: J.number()
        .allow(null)
        .optional(),
    nodeNeutralizeAssist: J.number()
        .allow(null)
        .optional(),
    objectivePlayerScore: J.number().required(),
    participantId: J.number().required(),
    pentaKills: J.number().required(),
    perk0Var1: J.number().required(),
    perk0Var2: J.number().required(),
    perk0Var3: J.number().required(),
    perk1: J.number().required(),
    perk1Var1: J.number().required(),
    perk1Var2: J.number().required(),
    perk1Var3: J.number().required(),
    perk2: J.number().required(),
    perk2Var1: J.number().required(),
    perk2Var2: J.number().required(),
    perk2Var3: J.number().required(),
    perk3: J.number().required(),
    perk3Var1: J.number().required(),
    perk3Var2: J.number().required(),
    perk3Var3: J.number().required(),
    perk4: J.number().required(),
    perk4Var1: J.number().required(),
    perk4Var2: J.number().required(),
    perk4Var3: J.number().required(),
    perk5: J.number().required(),
    perk5Var1: J.number().required(),
    perk5Var2: J.number().required(),
    perk5Var3: J.number().required(),
    perkPrimaryStyle: J.number().required(),
    perkSubStyle: J.number().required(),
    physicalDamageDealt: J.number().required(),
    physicalDamageDealtToChampions: J.number().required(),
    physicalDamageTaken: J.number().required(),
    playerScore0: J.number().required(),
    playerScore1: J.number().required(),
    playerScore2: J.number().required(),
    playerScore3: J.number().required(),
    playerScore4: J.number().required(),
    playerScore5: J.number().required(),
    playerScore6: J.number().required(),
    playerScore7: J.number().required(),
    playerScore8: J.number().required(),
    playerScore9: J.number().required(),
    quadraKills: J.number().required(),
    sightWardsBoughtInGame: J.number().required(),
    teamObjective: J.number()
        .allow(null)
        .optional(),
    timeCCingOthers: J.number().required(),
    totalDamageDealt: J.number().required(),
    totalDamageDealtToChampions: J.number().required(),
    totalDamageTaken: J.number().required(),
    totalHeal: J.number().required(),
    totalMinionsKilled: J.number().required(),
    totalPlayerScore: J.number().required(),
    totalScoreRank: J.number().required(),
    totalTimeCrowdControlDealt: J.number().required(),
    totalUnitsHealed: J.number().required(),
    kills: J.number().required(),
    doubleKills: J.number().required(),
    tripleKills: J.number().required(),
    inhibitorKills: J.number().required(),
    champLevel: J.number().required(),
    firstTowerKill: J.boolean().required(),
    firstTowerAssist: J.boolean().required(),
    perk0: J.number().required(),
    statPerk0: J.number().required(),
    statPerk1: J.number().required(),
    statPerk2: J.number().required(),
    trueDamageDealt: J.number().required(),
    trueDamageDealtToChampions: J.number().required(),
    trueDamageTaken: J.number().required(),
    turretKills: J.number().required(),
    unrealKills: J.number().required(),
    visionScore: J.number().required(),
    visionWardsBoughtInGame: J.number().required(),
    wardsKilled: J.number().required(),
    wardsPlaced: J.number().required(),
    win: J.boolean().required()
}).id('ParticipantStatsDto');

/**
 * @ignore
 */

export const PlayerDTOSchema: Joi.ObjectSchema = J.object({
    currentPlatformId: J.string()
        .allow('')
        .required(),
    summonerName: J.string()
        .allow('')
        .required(),
    matchHistoryUri: J.string()
        .allow('')
        .required(),
    platformId: J.string()
        .allow('')
        .required(),
    currentAccountId: J.string()
        .allow('')
        .required(),
    profileIcon: J.number().required(),
    summonerId: J.string()
        .allow('')
        .required(),
    accountId: J.string()
        .allow('')
        .required()
}).id('PlayerDTO');

/**
 * @ignore
 */

export const TeamStatsDtoSchema: Joi.ObjectSchema = J.object({
    firstDragon: J.boolean().required(),
    firstInhibitor: J.boolean().required(),
    bans: J.array()
        .items(referenceSchema(() => TeamBansDtoSchema))
        .allow(null)
        .optional(),
    baronKills: J.number().required(),
    firstRiftHerald: J.boolean().required(),
    firstBaron: J.boolean().required(),
    firstBlood: J.boolean().required(),
    teamId: enumSchema(Team).required(),
    firstTower: J.boolean().required(),
    vilemawKills: J.number().required(),
    inhibitorKills: J.number().required(),
    towerKills: J.number().required(),
    dominionVictoryScore: J.number().required(),
    win: enumSchema(WinString).required(),
    dragonKills: J.number()
        .allow(null)
        .optional(),
    riftHeraldKills: J.number()
        .allow(null)
        .optional()
}).id('TeamStatsDto');

/**
 * @ignore
 */

export const TeamBansDtoSchema: Joi.ObjectSchema = J.object({
    pickTurn: J.number().required(),
    championId: enumSchema(ChampionId).required()
}).id('TeamBansDto');

/**
 * @ignore
 */

export const ParticipantTimelineDtoSchema: Joi.ObjectSchema = J.object({
    lane: J.string()
        .allow('')
        .required(),
    participantId: J.number().required(),
    csDiffPerMinDeltas: J.object()
        .pattern(J.string(), J.number())
        .allow(null)
        .optional(),
    goldPerMinDeltas: J.object()
        .pattern(J.string(), J.number())
        .required(),
    xpDiffPerMinDeltas: J.object()
        .pattern(J.string(), J.number())
        .allow(null)
        .optional(),
    creepsPerMinDeltas: J.object()
        .pattern(J.string(), J.number())
        .required(),
    xpPerMinDeltas: J.object()
        .pattern(J.string(), J.number())
        .required(),
    role: J.string()
        .allow('')
        .required(),
    damageTakenDiffPerMinDeltas: J.object()
        .pattern(J.string(), J.number())
        .allow(null)
        .optional(),
    damageTakenPerMinDeltas: J.object()
        .pattern(J.string(), J.number())
        .required()
}).id('ParticipantTimelineDto');

/**
 * @ignore
 */

export const MatchTimelineDtoSchema: Joi.ObjectSchema = J.object({
    frames: J.array()
        .items(referenceSchema(() => MatchFrameDtoSchema))
        .required(),
    frameInterval: J.number()
        .allow(null)
        .optional()
}).id('MatchTimelineDto');

/**
 * @ignore
 */

export const MatchFrameDtoSchema: Joi.ObjectSchema = J.object({
    timestamp: J.number().required(),
    participantFrames: J.object()
        .pattern(
            J.string(),
            referenceSchema(() => MatchParticipantFrameDtoSchema)
        )
        .required(),
    events: J.array()
        .items(referenceSchema(() => MatchEventDtoSchema))
        .required(),
    frameInterval: J.number()
        .allow(null)
        .optional()
}).id('MatchFrameDto');

/**
 * @ignore
 */

export const MatchParticipantFrameDtoSchema: Joi.ObjectSchema = J.object({
    totalGold: J.number().required(),
    teamScore: J.number()
        .allow(null)
        .optional(),
    participantId: J.number().required(),
    level: J.number().required(),
    currentGold: J.number().required(),
    minionsKilled: J.number().required(),
    dominionScore: J.number()
        .allow(null)
        .optional(),
    position: referenceSchema(() => MatchPositionDtoSchema)
        .allow(null)
        .optional(),
    xp: J.number().required(),
    jungleMinionsKilled: J.number().required(),
    framesInterval: J.number()
        .allow(null)
        .optional()
}).id('MatchParticipantFrameDto');

/**
 * @ignore
 */

export const MatchPositionDtoSchema: Joi.ObjectSchema = J.object({
    y: J.number().required(),
    x: J.number().required()
}).id('MatchPositionDto');

/**
 * @ignore
 */

export const MatchEventDtoSchema: Joi.ObjectSchema = J.object({
    afterId: J.number()
        .allow(null)
        .optional(),
    ascendedType: J.string()
        .allow('')
        .allow(null)
        .optional(),
    assistingParticipantIds: J.array()
        .items(J.number())
        .allow(null)
        .optional(),
    beforeId: J.number()
        .allow(null)
        .optional(),
    buildingType: J.string()
        .allow('')
        .allow(null)
        .optional(),
    creatorId: J.number()
        .allow(null)
        .optional(),
    eventType: J.string()
        .allow('')
        .allow(null)
        .optional(),
    itemId: J.number()
        .allow(null)
        .optional(),
    killerId: J.number()
        .allow(null)
        .optional(),
    laneType: J.string()
        .allow('')
        .allow(null)
        .optional(),
    levelUpType: J.string()
        .allow('')
        .allow(null)
        .optional(),
    monsterSubType: J.string()
        .allow('')
        .allow(null)
        .optional(),
    monsterType: J.string()
        .allow('')
        .allow(null)
        .optional(),
    participantId: J.number()
        .allow(null)
        .optional(),
    pointCaptured: J.number()
        .allow(null)
        .optional(),
    position: referenceSchema(() => MatchPositionDtoSchema)
        .allow(null)
        .optional(),
    skillSlot: J.number()
        .allow(null)
        .optional(),
    teamId: enumSchema(Team)
        .allow(null)
        .optional(),
    timestamp: J.number().required(),
    towerType: J.string()
        .allow('')
        .allow(null)
        .optional(),
    type: J.string()
        .allow('')
        .required(),
    victimId: J.number()
        .allow(null)
        .optional(),
    wardType: J.string()
        .allow('')
        .allow(null)
        .optional(),
    framesInterval: J.number()
        .allow(null)
        .optional()
}).id('MatchEventDto');

/**
 * @ignore
 */

export const MatchlistDtoSchema: Joi.ObjectSchema = J.object({
    matches: J.array()
        .items(referenceSchema(() => MatchReferenceDtoSchema))
        .required(),
    totalGames: J.number().required(),
    startIndex: J.number().required(),
    endIndex: J.number().required()
}).id('MatchlistDto');

/**
 * @ignore
 */

export const MatchReferenceDtoSchema: Joi.ObjectSchema = J.object({
    lane: J.string()
        .allow('')
        .required(),
    gameId: J.number().required(),
    champion: enumSchema(ChampionId).required(),
    platformId: J.string()
        .allow('')
        .required(),
    season: enumSchema(Season).required(),
    queue: enumSchema(GameQueue).required(),
    role: J.string()
        .allow('')
        .required(),
    timestamp: J.number().required()
}).id('MatchReferenceDto');

/**
 * @ignore
 */

export const MiniSeriesDTOSchema: Joi.ObjectSchema = J.object({
    progress: J.string()
        .allow('')
        .required(),
    losses: J.number().required(),
    target: J.number().required(),
    wins: J.number().required()
}).id('MiniSeriesDTO');

/**
 * @ignore
 */

export const ShardStatusSchema: Joi.ObjectSchema = J.object({
    name: J.string()
        .allow('')
        .required(),
    region_tag: J.string()
        .allow('')
        .required(),
    hostname: J.string()
        .allow('')
        .required(),
    services: J.array()
        .items(referenceSchema(() => ShardStatusServiceSchema))
        .required(),
    slug: J.string()
        .allow('')
        .required(),
    locales: J.array()
        .items(J.string().allow(''))
        .required()
}).id('ShardStatus');

/**
 * @ignore
 */

export const ShardStatusServiceSchema: Joi.ObjectSchema = J.object({
    status: J.string()
        .allow('')
        .required(),
    incidents: J.array()
        .items(referenceSchema(() => ShardStatusServiceIncidentSchema))
        .required(),
    name: J.string()
        .allow('')
        .required(),
    slug: J.string()
        .allow('')
        .required()
}).id('ShardStatusService');

/**
 * @ignore
 */

export const ShardStatusServiceIncidentSchema: Joi.ObjectSchema = J.object({
    active: J.boolean().required(),
    created_at: J.string()
        .allow('')
        .required(),
    id: J.number().required(),
    updates: J.array()
        .items(referenceSchema(() => ShardStatusServiceIncidentMessageSchema))
        .required()
}).id('ShardStatusServiceIncident');

/**
 * @ignore
 */

export const ShardStatusServiceIncidentMessageSchema: Joi.ObjectSchema = J.object(
    {
        severity: J.string()
            .allow('')
            .required(),
        author: J.string()
            .allow('')
            .required(),
        created_at: J.string()
            .allow('')
            .required(),
        translations: J.array()
            .items(
                referenceSchema(
                    () => ShardStatusServiceIncidentMessageTranslationSchema
                )
            )
            .required(),
        updated_at: J.string()
            .allow('')
            .allow(null)
            .optional(),
        content: J.string()
            .allow('')
            .required(),
        id: J.string()
            .allow('')
            .required(),
        heading: J.string()
            .allow('')
            .required()
    }
).id('ShardStatusServiceIncidentMessage');

/**
 * @ignore
 */

export const ShardStatusServiceIncidentMessageTranslationSchema: Joi.ObjectSchema = J.object(
    {
        locale: J.string()
            .allow('')
            .required(),
        content: J.string()
            .allow('')
            .required(),
        updated_at: J.string()
            .allow('')
            .allow(null)
            .optional(),
        heading: J.string()
            .allow('')
            .required()
    }
).id('ShardStatusServiceIncidentMessageTranslation');
