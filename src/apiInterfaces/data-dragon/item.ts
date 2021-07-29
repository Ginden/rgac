import { GameItem } from '../generated/items';
import { GameItemStat } from '../generated/itemStats';
import { GameMap } from '../generated/maps';

export interface DataDragonItem {
    type: 'item';
    version: string;
    basic: unknown;
    data: Record<GameItem, DataDragonItemItem>;
}

export interface DataDragonItemItem {
    name: string;
    description: string;
    colloq: string;
    plaintext: string;
    into: GameItem[];
    image: {
        full: string;
    };
    gold: {
        base: number;
        purchasable: boolean;
        total: number;
        sell: number;
    };
    tags: string[];
    maps: Partial<Record<GameMap, boolean>>;
    stats: Partial<Record<GameItemStat, number>>;
}
