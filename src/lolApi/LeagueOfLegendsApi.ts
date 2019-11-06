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
    get championMasteries(): ChampionMasteriesClient {
        return new ChampionMasteriesClient(this.client);
    }

    @CachedGetter
    get leagueExp(): LeagueExpClient {
        return new LeagueExpClient(this.client);
    }

    @CachedGetter
    get league(): LeagueClient {
        return new LeagueClient(this.client);
    }

    @CachedGetter
    get status(): StatusClient {
        return new StatusClient(this.client);
    }

    @CachedGetter
    get champions(): ChampionClient {
        return new ChampionClient(this.client);
    }

    @CachedGetter
    get matches(): MatchClient {
        return new MatchClient(this.client);
    }

    @CachedGetter
    get spectator(): SpectatorClient {
        return new SpectatorClient(this.client);
    }

    @CachedGetter
    get summoner(): SummonerClient {
        return new SummonerClient(this.client);
    }

    @CachedGetter
    get thirdParty(): ThirdPartyCodeClient {
        return new ThirdPartyCodeClient(this.client);
    }
}
