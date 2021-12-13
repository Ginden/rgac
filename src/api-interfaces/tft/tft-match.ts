export interface TftMatchDto {
    info: TftInfoDto;
    metadata: TftMetadataDto;
}

export interface TftInfoDto {
    game_datetime: number;
    participants: TftParticipantDto[];
    tft_set_number: number;
    game_length: number;
    queue_id: number;
    game_version: string;
}

export interface TftParticipantDto {
    placement: number;
    level: number;
    last_round: number;
    time_eliminated: number;
    companion?: TftCompanionDto;
    traits: TftTraitDto[];
    players_eliminated: number;
    puuid: string;
    total_damage_to_players: number;
    units: TftUnitDto[];
    gold_left: number;
}

export interface TftTraitDto {
    tier_total: number;
    name: string;
    tier_current: number;
    num_units: number;
}

export interface TftUnitDto {
    tier: number;
    items: number[];
    character_id: string;
    name: string;
    rarity: number;
}

export interface TftCompanionDto {
    skin_ID: number;
    content_ID: string;
    species: string;
}

export interface TftMetadataDto {
    data_version: string;
    participants: string[];
    match_id: string;
}
