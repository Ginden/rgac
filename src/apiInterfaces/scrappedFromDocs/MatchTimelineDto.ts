import { Dictionary } from './MatchDto';
import { Team } from '../manual/Teams';

export interface MatchTimelineDto {
    frames: MatchFrameDto[];
    framesInterval: number;
}

export interface MatchFrameDto {
    timestamp: number;
    participantFrames: Dictionary<MatchParticipantFrameDto>;
    events: MatchEventDto[];
}

export interface MatchParticipantFrameDto {
    totalGold: number;
    teamScore: number;
    participantId: number;
    level: number;
    currentGold: number;
    minionsKilled: number;
    dominionScore: number;
    position: MatchPositionDto;
    xp: number;
    jungleMinionsKilled: number;
}

export interface MatchPositionDto {
    y: number;
    x: number;
}

export interface MatchEventDto {
    afterId?: number;
    ascendedType?: string;
    assistingParticipantIds?: number[];
    beforeId?: number;
    buildingType?: string;
    creatorId?: number;
    eventType?: string;
    itemId?: number;
    killerId?: number;
    laneType?: string;
    levelUpType?: string;
    monsterSubType?: string;
    monsterType?: string;
    participantId?: number;
    pointCaptured?: number;
    position?: MatchPositionDto;
    skillSlot?: number;
    teamId?: Team;
    timestamp: number;
    towerType?: string;
    type: string;
    victimId?: number;
    wardType?: string;
}
