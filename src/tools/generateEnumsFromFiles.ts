import slug = require('slug');
import _ = require('lodash');
import axios from 'axios';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { RiotApiClient } from '../RiotApiClient';

const patch = RiotApiClient.dataDragonVersion;
const urls = {
    seasons: `http://static.developer.riotgames.com/docs/lol/seasons.json`,
    gameQueues: `http://static.developer.riotgames.com/docs/lol/queues.json`,
    maps: `http://static.developer.riotgames.com/docs/lol/maps.json`,
    gameTypes: `http://static.developer.riotgames.com/docs/lol/gameTypes.json`,
    gameModes: `http://static.developer.riotgames.com/docs/lol/gameModes.json`,
    champions: `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`,
    items: `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item.json`,
    runesReforged: `http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`,
};

function seasons(arr: { id: number; season: string }[]): string {
    const ret = [`export enum Season {`];
    for (const { season, id } of arr) {
        ret.push(`  ${slug(season, `_`)} = ${id},`);
    }
    ret.push(`};`);
    return ret.join(`\n`);
}

type Queue = {
    queueId: number;
    map: string;
    description: string;
    notes: string;
};

function gameQueues(arr: Queue[]): string {
    const ret = [`export enum GameQueue {`];

    function simpleSlug({ description, map }: Queue) {
        let slugified = slug(description || map, `_`).toUpperCase();
        if (description && description.toLowerCase().includes(`deprecated`)) {
            slugified += `DEPRECATED`;
        }
        if (slugified.match(/^[0-9]/)) {
            slugified = `QUEUE_` + slugified;
        }
        if (slugified.includes(`_GAMES`)) {
            slugified = slugified.replace(`_GAMES`, ``);
        }
        return slugified;
    }

    function addSlugs(qs: Queue[]): (Queue & { slugified: string })[] {
        const counts = _.countBy(qs, simpleSlug);
        return qs.map((q) => {
            return {
                ...q,
                slugified: counts[simpleSlug(q)] === 1 ? simpleSlug(q) : `${simpleSlug(q)}_${q.queueId}`,
            };
        });
    }

    for (const { queueId, description, notes, slugified } of addSlugs(arr)) {
        const comment = notes || description ? ` // ` + (notes || description) : ``;
        ret.push(`  ${slugified} = ${queueId},${comment}`);
    }
    ret.push(`};`);
    return ret.join(`\n`);
}

type MapEntry = { mapId: number; mapName: string; notes: string };

function maps(arr: MapEntry[]): string {
    const ret = [`export enum Map {`];

    const pairs: [string, MapEntry[]][] = Object.entries(_.groupBy(arr, (v) => slug(v.mapName, `_`).toUpperCase()));
    for (const [slugifiedMapName, entries] of pairs) {
        for (const { mapId, notes } of entries) {
            const slugified = entries.length > 1 ? `${slugifiedMapName}_${mapId}` : slugifiedMapName;
            ret.push(`  ${slugified} = ${mapId}, // ${notes}`);
        }
    }
    ret.push(`};`);
    return ret.join(`\n`);
}

function gameTypes(arr: { gametype: string; description: string }[]): string {
    const ret = [`export enum GameType {`];
    for (const { gametype, description } of arr) {
        ret.push(`  ${slug(gametype, `_`)} = '${gametype}', // ${description}`);
    }
    ret.push(`};`);
    return ret.join(`\n`);
}

function gameModes(arr: { gameMode: string; description: string }[]): string {
    const ret = [`export enum GameMode {`];
    for (const { gameMode, description } of arr) {
        ret.push(`  ${slug(gameMode, `_`)} = '${gameMode}', // ${description}`);
    }
    ret.push(`};`);
    return ret.join(`\n`);
}

type ChampionData = {
    data: {
        [K: string]: {
            id: string;
            key: string;
            name: string;
        };
    };
};

function champions({ data }: ChampionData): string {
    let ret = [`import { DataDragonChampionInfo } from '..';`, `export enum ChampionId {`];
    ret.push(`  None = -1,`);
    for (const { name, id, key } of Object.values(data)) {
        const slugifiedName = slug(name, `_`);
        const slugifiedId = slug(id, `_`);
        /*
            Order matters.
            Last string will be used by TypeScript reversed enum mapping.
            Therefore, it's prefered to have eg. "MonkeyKing" as last entry referring to Wukong,
            because then interoperability with other systems is improved
        */
        ret.push(`  ${slugifiedName.toUpperCase()} = ${key},`);
        ret.push(`  ${slugifiedId.toUpperCase()} = ${key},`);
        ret.push(`  ${slugifiedName} = ${key},`);
        ret.push(`  ${slugifiedId} = ${key},`);
    }
    ret.push(`};`);
    ret = [...new Set(ret)];
    const jsonFriendlyForTypescript = JSON.stringify(_.keyBy(Object.values(data), `key`), null, 2)
        .split(`\n`)
        .map((e) => {
            if (e.match(/"([0-9]*)": {/)) {
                return e.replace(/"/g, ``);
            }
            return e;
        });
    ret.push(``);
    ret.push(`/**
    * @ignore
    */`);
    ret.push(`export const championData: {[K in ChampionId]: DataDragonChampionInfo | null} = {`);
    ret.push(`'-1': null,`);
    ret.push(...jsonFriendlyForTypescript.slice(1, -1));
    ret.push(`};`);
    return ret.join(`\n`);
}

type ItemData = {
    data: {
        [K: string]: {
            id: string;
            name: string;
        };
    };
};

function items(id: ItemData) {
    let ret = [`export enum GameItem {`];
    const duplicatedKeys = _.countBy(Object.values(id.data), ({ name }) => slug(name, `_`).toUpperCase());
    for (const [key, { name }] of _.sortBy(Object.entries(id.data), `1.name`)) {
        let slugified = slug(name, `_`).toUpperCase();
        if (duplicatedKeys[slugified] > 1) {
            slugified += `_${key}`;
        }
        ret.push(`  ${slugified} = ${key}, // ${name}`);
    }
    ret.push(`};`);
    return ret.join(`\n`);
}

type RunesReforgedTree = {
    id: number;
    key: string;
    slots: {
        runes: {
            id: number;
            key: string;
            name: string;
        }[];
    }[];
};

function runesReforged(rrta: RunesReforgedTree[]) {
    const ret = [`export enum RunesReforgedTrees {`];
    for (const { key, id } of rrta) {
        ret.push(`  ${key} = ${id},`);
    }
    ret.push(`};`, ``);

    ret.push(`export enum RunesReforgedAll {`);
    for (const { slots } of rrta) {
        for (const { runes } of slots) {
            for (const { key, id } of runes) {
                ret.push(`  ${slug(_.snakeCase(key), `_`).toUpperCase()} = ${id},`);
                ret.push(`  ${key} = ${id},`);
            }
        }
    }
    ret.push(`};`, ``);
    return ret.join(`\n`);
}

type MappingFunction = (val: any) => string;
const generators: { [K in keyof typeof urls]: MappingFunction } = {
    seasons,
    gameQueues,
    maps,
    gameTypes,
    gameModes,
    champions,
    items,
    runesReforged,
};

(async () => {
    for (const [name, generator] of Object.entries(generators) as [keyof typeof urls, MappingFunction][]) {
        const ret: any = (await axios.get(urls[name])).data;
        const generated = `/* Generated from URL ${urls[name]} */ \n`.concat(generator(ret));
        writeFileSync(join(process.cwd(), `src`, `apiInterfaces`, `generated`, `${name}.ts`), generated);
    }
})()
    .then(() => console.log(`Generated enums from files`))
    .then(() => process.exit(0))
    .catch((e) => {
        setImmediate(() => {
            throw e;
        });
    });
