import {
    ApiSummonerInfo,
    ChampionMasteryDTO,
    ChampionId,
    LeagueEntryDTO,
    MatchlistDto,
    CurrentGameInfo,
} from '../apiInterfaces';
import { ChildClient } from '../ChildClient';
import { RiotApiClient } from '../RiotApiClient';
import { AnySummonerFormat, MatchFilterObject, SummonerId, AccountId, Puuid } from '../types';
import { assertIsNotEmpty } from '../assert';
import { isString } from 'lodash';

/**
 * This class encapsulates match info
 * @group API
 */
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

    /**
     * See [[MatchClient.listBySummoner]]
     */
    public getMatches(filter: MatchFilterObject = {}): Promise<MatchlistDto> {
        return this.client.lol.matches.listBySummoner(this, filter);
    }

    /**
     * See [[SpectatorClient.activeGamesBySummoner]]
     */
    public getActiveMatches(): Promise<CurrentGameInfo> {
        return this.client.lol.spectator.activeGamesBySummoner(this);
    }

    /**
     * See [[ChampionMasteriesClient.bySummonerAndChampion]]
     */
    public getChampionMastery(champion: ChampionId): Promise<ChampionMasteryDTO> {
        return this.client.lol.championMasteries.bySummonerAndChampion(this, champion);
    }

    /**
     * See [[ChampionMasteriesClient.bySummoner]]
     */
    public getChampionMasteries(): Promise<ChampionMasteryDTO[]> {
        return this.client.leagueOfLegends.championMasteries.bySummoner(this);
    }

    /**
     * See [[LeagueClient.entriesBySummoner]]
     */
    public getLeagueEntries(): Promise<LeagueEntryDTO[]> {
        return this.client.leagueOfLegends.league.entriesBySummoner(this);
    }

    /**
     * See [[ThirdPartyCodeClient.bySummoner]]
     */
    public thirdPartyCode(): Promise<string> {
        return this.client.leagueOfLegends.thirdParty.bySummoner(this);
    }

    /**
     * Returns encrypted accountId from param
     * Strings are assumed to be ids.
     * @param {AccountId} summoner
     * @return {string}
     */
    public static accountId(summoner: AccountId): string {
        assertIsNotEmpty(summoner);
        if (isString(summoner)) {
            if (summoner.length === 78) {
                throw new Error(`PUUID given, but encrypted account ID was required`);
            }
            return summoner;
        }
        return summoner.accountId;
    }

    /**
     * Return puuid from argument
     * Strings are assumed to be ids.
     * @param {Puuid} summoner
     * @return {string}
     */
    public static puuid(summoner: Puuid): string {
        assertIsNotEmpty(summoner);
        if (isString(summoner)) {
            if (summoner.length !== 78) {
                throw new Error(`"${summoner}" is not a valid PUUID`);
            }
            return summoner;
        }
        return summoner.puuid;
    }

    /**
     * Returns encryptedSummonerId from argument.
     * Strings are assumed to be ids.
     * @param {SummonerId} summoner
     * @return {string | any}
     */
    public static id(summoner: SummonerId): string {
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

    /**
     * Gets name from argument.
     * String are assumed to be names.
     * @param {AnySummonerFormat} summoner
     * @return {string}
     */
    public static getName(summoner: AnySummonerFormat): string {
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
