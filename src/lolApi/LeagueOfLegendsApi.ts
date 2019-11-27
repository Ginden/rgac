import { ChildClient } from '../ChildClient';
import { CachedGetter } from '../decorators';
import { ChampionClient } from './ChampionClient';
import { ChampionMasteriesClient } from './ChampionMasteriesClient';
import { LeagueClient } from './leagueClient';
import { LeagueExpClient } from './leagueExpClient';
import { MatchClient } from './MatchClient';
import { SpectatorClient } from './SpectatorClient';
import { StatusClient } from './statusClient';
import { SummonerClient } from './SummonerClient';
import { ThirdPartyCodeClient } from './ThirdPartyCodeClient';

export class LeagueOfLegendsApi extends ChildClient {
    @CachedGetter
    public get championMasteries(): ChampionMasteriesClient {
        return new ChampionMasteriesClient(this.client);
    }

    @CachedGetter
    public get leagueExp(): LeagueExpClient {
        return new LeagueExpClient(this.client);
    }

    @CachedGetter
    public get league(): LeagueClient {
        return new LeagueClient(this.client);
    }

    @CachedGetter
    public get status(): StatusClient {
        return new StatusClient(this.client);
    }

    @CachedGetter
    public get champions(): ChampionClient {
        return new ChampionClient(this.client);
    }

    @CachedGetter
    public get matches(): MatchClient {
        return new MatchClient(this.client);
    }

    @CachedGetter
    public get spectator(): SpectatorClient {
        return new SpectatorClient(this.client);
    }

    @CachedGetter
    public get summoner(): SummonerClient {
        return new SummonerClient(this.client);
    }

    @CachedGetter
    public get thirdParty(): ThirdPartyCodeClient {
        return new ThirdPartyCodeClient(this.client);
    }
}
