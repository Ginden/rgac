import { ChildClient } from '../child-client';
import { CachedGetter } from '../decorators';
import { TftLeagueClient } from './league';
import { TftMatchClient } from './match';
import { TftSummonerClient } from './summoner';

export class TeamfightTacticsApi extends ChildClient {
    @CachedGetter
    public get league(): TftLeagueClient {
        return new TftLeagueClient(this.client);
    }

    @CachedGetter
    public get match(): TftMatchClient {
        return new TftMatchClient(this.client);
    }

    @CachedGetter
    public get summoner(): TftSummonerClient {
        return new TftSummonerClient(this.client);
    }
}
