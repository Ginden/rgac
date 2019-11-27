import { writeFile } from 'fs';
import { RiotApiClient } from '../../../src';
import { Summoner } from '../../../src/apiClasses';
import { Servers } from '../../../src/apiInterfaces';
import { join } from 'path';

export const server: Servers = process.env.RGAC_TEST_SERVER
    ? Servers[process.env.RGAC_TEST_SERVER as keyof typeof Servers] ||
      process.env.RGAC_TEST_SERVER
    : Servers.EUW1;
export const summonerName: string =
    process.env.RGAC_TEST_USERNAME || 'GindenEU';
if (!process.env.RIOT_API_KEY) {
    throw new Error(`Env variable RIOT_API_KEY must be set`);
}
export const apiKey: string = process.env.RIOT_API_KEY;

let summoner: Promise<Summoner>;

export async function getSummoner(client: RiotApiClient): Promise<Summoner> {
    if (!summoner) {
        summoner = client.leagueOfLegends.summoner.byName(summonerName);
    }
    return summoner;
}

const examplesDir = join(__dirname, '..', '..', '..', 'example-responses');
export function saveData(key: string, data: any): void {
    const filePath = join(examplesDir, `${key}.json`);
    writeFile(filePath, JSON.stringify(data, null, 2), err => {
        if (err) {
            console.error(err, filePath);
        }
    });
}
