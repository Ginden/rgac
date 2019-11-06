import {
    ApiSummonerInfoSchema,
    GameQueue,
    J,
    MatchDtoSchema,
    MatchlistDtoSchema,
    MatchTimelineDtoSchema,
    RiotApiClient
} from '../../../src';
import { Summoner } from '../../../src/apiClasses';
import { Servers } from '../../../src/apiInterfaces';

const startUser = 'GindenEU';

describe('RiotApiClient.leagueOfLegends.match', () => {
    let client: RiotApiClient;
    beforeAll(async () => {
        client = new RiotApiClient({
            apiKey: String(process.env.RIOT_API_KEY),
            server: Servers.EUW1
        });
    });

    test('Data matches on all methods', async () => {
        const summoner = await client.leagueOfLegends.summoner.byName(
            startUser
        );
        const { data } = await summoner.getMatches();
        J.assert(data, MatchlistDtoSchema);
    });

    const queues: GameQueue[] = [
        GameQueue.QUEUE_5V5_ARAM_450,
        GameQueue.QUEUE_3V3_BLIND_PICK,
        GameQueue.QUEUE_5V5_DRAFT_PICK_400
    ];
    for (const queue of queues) {
        test(`Match details for queue ${GameQueue[queue]} with timeline`, async () => {
            const summoner = await client.leagueOfLegends.summoner.byName(
                startUser
            );
            const {
                data: {
                    matches: [lastMatch]
                }
            } = await summoner.getMatches();
            const match = await client.leagueOfLegends.matches.get(lastMatch);
            J.assert(match, MatchDtoSchema);
            const timeline = await match.getTimeline();
            J.assert(timeline, MatchTimelineDtoSchema);
        });
    }
});
