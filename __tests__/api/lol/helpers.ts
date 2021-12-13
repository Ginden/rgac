import { RiotApiClient } from '../../../src';
import { Summoner } from '../../../src/api-classes';
import { summonerName } from '../../helpers';

export { summonerName, saveData, server, apiKey } from '../../helpers';

let summoner: Promise<Summoner>;

export async function getSummoner(client: RiotApiClient): Promise<Summoner> {
    if (!summoner) {
        summoner = client.leagueOfLegends.summoner.byName(summonerName);
    }
    return summoner;
}
