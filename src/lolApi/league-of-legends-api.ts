import { ChildClient } from '../child-client';
import { CachedGetter } from '../decorators';
import { ChampionClient } from './champion-client';
import { ChampionMasteriesClient } from './champion-masteries-client';
import { LeagueClient } from './league-client';
import { LeagueExpClient } from './league-exp-client';
import { MatchClient } from './match-client';
import { SpectatorClient } from './spectator-client';
import { StatusClient } from './status-client';
import { SummonerClient } from './summoner-client';
import { ThirdPartyCodeClient } from './third-party-code-client';
import { ClashClient } from './clash-client';

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

    @CachedGetter
    public get clash(): ClashClient {
        return new ClashClient(this.client);
    }
}
