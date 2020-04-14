export enum SRPosition {
    UNSELECTED = 'UNSELECTED',
    FILL = 'FILL',
    TOP = 'TOP',
    JUNGLE = 'JUNGLE',
    MIDDLE = 'MIDDLE',
    BOTTOM = 'BOTTOM',
    UTILITY = 'UTILITY',
}

export enum ClashRole {
    CAPTAIN = 'CAPTAIN',
    MEMBER = 'MEMBER',
}

export interface ClashPlayerDto {
    summonerId: string;
    teamId?: string;
    position: SRPosition;
}

export interface ClashTeamDto {
    id: string;
    tournamentId: number;
    name: string;
    iconId: number;
    tier: number;
    captain: string; // Summoner ID of the team captain.
    abbreviation: string;
    players: ClashPlayerDto[];
}

export interface ClashTournamentDto {
    id: number;
    themeId: number;
    nameKey: string;
    nameKeySecondary: string;
    schedule: TournamentPhaseDto[];
}

export interface TournamentPhaseDto {
    id: number;
    registrationTime: number;
    startTime: number;
    cancelled: boolean;
}
