# RGAC

This *R*iot *G*ames *A*PI *C*lient is written in TypeScript and offers fluent interfaces, full typing, data classes.

Example usage with top level await:
```typescript
import {RiotApiClient, Servers} from 'rgac';
const client = new RiotApiClient({
    apiKey: process.env.RIOT_API_KEY,
    server: Servers.EUW1
});
const summoner = await client.leagueOfLegends.summoner.byName('GindenEU');
const {data: [match], getNextPage} = await summoner.getMatches();
const timeline = await match.timeline();
const {data: [anotherMatch]} = await getNextPage();
```

# Features

* Full support for normal League of Legends API

# Known limitations

* `summonerId`, `puuid`, `accountId` confusion.
** `Summoner` instances automatically handle these subtleties, but very few endpoints return them.
* Limited rate limiting - currently, you can specify only `maxRequests` and `perMilliseconds` and it's less flexible than system provided by Riot Games.
* Need to manually check if has next page.

# Roadmap
* TFT API support
* Tournament API support
* Legends of Runeterra support
* Intelligent caching of responses
* AsyncIterables for pagination

# Disclaimer

RGAC isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games
or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are
trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
