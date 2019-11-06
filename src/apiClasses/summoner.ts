import {
    ApiSummonerInfo,
    ChampionMasteryDTO,
    ChampionId,
    LeagueEntryDTO,
    MatchlistDto
} from '../apiInterfaces';
import { ChildClient } from '../ChildClient';
import { RiotApiClient } from '../RiotApiClient';
import { AnySummonerFormat, MatchFilterObject, WithNextPage } from '../types';
import { assertIsNotEmpty } from '../assert';
import { isString } from 'lodash';

export class Summoner extends ChildClient implements ApiSummonerInfo {
    public readonly id: string;
    public readonly accountId: string;
    public readonly puuid: string;
    public readonly name: string;
    public readonly profileIconId: number;
    public readonly revisionDate: number;
    public readonly summonerLevel: number;

    constructor(client: RiotApiClient, data: ApiSummonerInfo) {
        super(client);
        this.id = data.id;
        this.accountId = data.accountId;
        this.puuid = data.puuid;
        this.name = data.name;
        this.profileIconId = data.profileIconId;
        this.revisionDate = data.revisionDate;
        this.summonerLevel = data.summonerLevel;
    }

    getMatches(
        filter: MatchFilterObject = {}
    ): Promise<WithNextPage<MatchlistDto>> {
        return this.client.leagueOfLegends.matches.listBySummoner(this, filter);
    }

    getChampionMastery(champion: ChampionId): Promise<ChampionMasteryDTO> {
        return this.client.leagueOfLegends.championMasteries.bySummonerAndChampion(
            this,
            champion
        );
    }

    getChampionMasteries(): Promise<ChampionMasteryDTO[]> {
        return this.client.leagueOfLegends.championMasteries.bySummoner(this);
    }

    getLeagueEntries(): Promise<LeagueEntryDTO[]> {
        return this.client.leagueOfLegends.league.entriesBySummoner(this);
    }

    thirdPartyCode(): Promise<never> {
        return this.client.leagueOfLegends.thirdParty.bySummoner(this);
    }

    static accountId(summoner: AnySummonerFormat) {
        assertIsNotEmpty(summoner);
        if (isString(summoner)) {
            if (summoner.length === 78) {
                throw new Error(
                    `PUUID given, but encrypted account ID was required`
                );
            }
            return summoner;
        }
        return summoner.accountId;
    }

    static puuid(summoner: AnySummonerFormat) {
        assertIsNotEmpty(summoner);
        if (isString(summoner)) {
            if (summoner.length !== 78) {
                throw new Error(`"${summoner}" is not a valid PUUID`);
            }
            return summoner;
        }
        return summoner.puuid;
    }

    static id(summoner: AnySummonerFormat) {
        assertIsNotEmpty(summoner);
        if (isString(summoner)) {
            if (summoner.length === 78) {
                throw new Error(`PUUID given, but summoner ID was required`);
            }
            return summoner;
        }
        return summoner.id;
    }

    static getName(summoner: AnySummonerFormat) {
        assertIsNotEmpty(summoner);
        if (isString(summoner)) {
            if (summoner.length === 78) {
                throw new Error(`PUUID given, but summoner ID was required`);
            }
            return summoner;
        }
        return summoner.name;
    }
}
