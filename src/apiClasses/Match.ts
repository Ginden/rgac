import { isNumber } from 'lodash';
import { ChildClient } from '../ChildClient';
import {
    GameMode,
    GameQueue,
    GameType,
    Map,
    MatchDto,
    MatchTimelineDto,
    ParticipantDto,
    ParticipantIdentityDto,
    Season,
    TeamStatsDto
} from '../apiInterfaces';
import { RiotApiClient } from '../RiotApiClient';
import { AnyMatchFormat } from '../types';

export class Match extends ChildClient implements MatchDto {
    public seasonId: Season;
    public queueId: GameQueue;
    public gameId: number;
    public participantIdentities: ParticipantIdentityDto[];
    public participants: ParticipantDto[];
    public gameVersion: string;
    public gameMode: GameMode;
    public mapId: Map;
    public gameType: GameType;
    public teams: TeamStatsDto[];
    public gameDuration: number;
    public gameCreation: number;

    public constructor(client: RiotApiClient, data: MatchDto) {
        super(client);
        this.seasonId = data.seasonId;
        this.queueId = data.queueId;
        this.gameId = data.gameId;
        this.participantIdentities = data.participantIdentities;
        this.participants = data.participants;
        this.gameVersion = data.gameVersion;
        this.gameMode = data.gameMode;
        this.mapId = data.mapId;
        this.gameType = data.gameType;
        this.teams = data.teams;
        this.gameDuration = data.gameDuration;
        this.gameCreation = data.gameCreation;
    }

    public static id(match: AnyMatchFormat): number {
        if (isNumber(match)) {
            return match;
        } else {
            return match.gameId;
        }
    }

    public getTimeline(): Promise<MatchTimelineDto> {
        return this.client.lol.matches.timeline(this);
    }
}
