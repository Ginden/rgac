# RGAC

This **R**iot **G**ames **A**PI **C**lient is written in TypeScript and offers fluent interfaces, full typing, data classes.

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

* Support for following APIs:
  * `champion-mastery-v4`
  * `champion-v3`
  * `league-exp-v4`
  * `league-v4`
  * `lol-status-v3`
  * `match-v4`
  * `spectator-v4`
  * `summoner-v4`
  * `third-party-code-v4`
* Rich objects:
  * `Summoner` and `Match` classes
* [Joi](https://github.com/hapijs/joi) schemas for all API interfaces
* TypeScript interfaces for API data

# Known limitations

* Limited rate limiting - currently, you can specify only `maxRequests` and `perMilliseconds` and it's less flexible than system provided by Riot Games.
* Need to manually check if has next page.

# Roadmap
* TFT API support
* Tournament API support
* Legends of Runeterra support
* Intelligent caching of responses
* AsyncIterables for pagination

# Contributing

See [CONTRIBUTING.MD](./CONTRIBUTING.MD);

# Disclaimer

RGAC isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games
or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are
trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
