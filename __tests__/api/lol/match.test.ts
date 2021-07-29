import {
  GameQueue,
  J,
  MatchDtoSchema,
  MatchlistDtoSchema,
  MatchTimelineDtoSchema,
  RiotApiClient,
} from '../../../src';
import { getSummoner, saveData, apiKey, server, summonerName } from './helpers';

describe('RiotApiClient.leagueOfLegends.match', () => {
  let client: RiotApiClient;
  beforeAll(async () => {
    client = new RiotApiClient({
      apiKey,
      server,
    });
  });

  test('List of matches works', async () => {
    const summoner = await client.leagueOfLegends.summoner.byName(summonerName);
    const data = await summoner.getMatches();
    expect(data.matches.length).toBeGreaterThan(0);
    saveData(`leagueOfLegends.lastSummonerMatches`, data);
    J.assert(data, MatchlistDtoSchema);
  });

  const queues: GameQueue[] = [GameQueue.QUEUE_5V5_ARAM_450, GameQueue.QUEUE_5V5_DRAFT_PICK_400];
  for (const queue of queues) {
    const queueName = GameQueue[queue];
    test(`Match details for queue ${queueName} with timeline`, async () => {
      const summoner = await getSummoner(client);
      const {
        matches: [lastMatch],
      } = await summoner.getMatches();
      const match = await client.leagueOfLegends.matches.get(lastMatch);
      saveData(`leagueOfLegends/matches/lastMatch.${queueName}`, match);
      J.assert(match, MatchDtoSchema);
      const timeline = await match.getTimeline();
      saveData(`leagueOfLegends/matches/lastMatch.${queueName}.timeline`, timeline);
      J.assert(timeline, MatchTimelineDtoSchema);
    });
  }
});
