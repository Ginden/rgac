import { writeFile } from 'fs';
import { dirname, join } from 'path';
import { Servers } from '../src/apiInterfaces';
import mkdirp = require('mkdirp-promise');

export const server: Servers = process.env.RGAC_TEST_SERVER
    ? Servers[process.env.RGAC_TEST_SERVER as keyof typeof Servers] || process.env.RGAC_TEST_SERVER
    : Servers.EUN1;
export const summonerName: string = process.env.RGAC_TEST_USERNAME || 'GindenEU';
if (!process.env.RIOT_API_KEY) {
    throw new Error(`Env variable RIOT_API_KEY must be set`);
}
export const apiKey: string = process.env.RIOT_API_KEY;

const examplesDir = join(__dirname, '..', '..', '..', 'example-responses');

export function saveData(key: string, data: any): void {
    const filePath = join(examplesDir, `${key}.json`);
    const dir = dirname(filePath);
    mkdirp(dir).then(() => {
        writeFile(filePath, JSON.stringify(data, null, 1), (err) => {
            if (err) {
                console.error(err, filePath);
            }
        });
    });
}
