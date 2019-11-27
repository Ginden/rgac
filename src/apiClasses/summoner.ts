import {
    ApiSummonerInfo,
    ChampionMasteryDTO,
    ChampionId,
    LeagueEntryDTO,
    MatchlistDto,
    CurrentGameInfo
} from '../apiInterfaces';
import { ChildClient } from '../ChildClient';
import { RiotApiClient } from '../RiotApiClient';
import {
    AnySummonerFormat,
    MatchFilterObject,
    WithNextPage,
    SummonerId,
    AccountId,
    Puuid
} from '../types';
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

    public constructor(client: RiotApiClient, data: ApiSummonerInfo) {
        super(client);
        this.id = data.id;
        this.accountId = data.accountId;
        this.puuid = data.puuid;
        this.name = data.name;
        this.profileIconId = data.profileIconId;
        this.revisionDate = data.revisionDate;
        this.summonerLevel = data.summonerLevel;
    }

    public getMatches(
        filter: MatchFilterObject = {}
    ): Promise<WithNextPage<MatchlistDto>> {
        return this.client.lol.matches.listBySummoner(this, filter);
    }

    getActiveMatches(): Promise<CurrentGameInfo> {
        return this.client.lol.spectator.activeGamesBySummoner(this);
    }

    getChampionMastery(champion: ChampionId): Promise<ChampionMasteryDTO> {
        return this.client.lol.championMasteries.bySummonerAndChampion(
            this,
            champion
        );
    }

    public getChampionMasteries(): Promise<ChampionMasteryDTO[]> {
        return this.client.leagueOfLegends.championMasteries.bySummoner(this);
    }

    public getLeagueEntries(): Promise<LeagueEntryDTO[]> {
        return this.client.leagueOfLegends.league.entriesBySummoner(this);
    }

    public thirdPartyCode(): Promise<string> {
        return this.client.leagueOfLegends.thirdParty.bySummoner(this);
    }

    public static accountId(summoner: AccountId) {
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

    public static puuid(summoner: Puuid) {
        assertIsNotEmpty(summoner);
        if (isString(summoner)) {
            if (summoner.length !== 78) {
                throw new Error(`"${summoner}" is not a valid PUUID`);
            }
            return summoner;
        }
        return summoner.puuid;
    }

    public static id(summoner: SummonerId) {
        assertIsNotEmpty(summoner);
        if (isString(summoner)) {
            if (summoner.length === 78) {
                throw new Error(`PUUID given, but summoner ID was required`);
            }
            return summoner;
        }
        if (`summonerId` in summoner) {
            return summoner.summonerId;
        }
        return summoner.id;
    }

    public static getName(summoner: AnySummonerFormat) {
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
