import { CurrentGameInfo } from './CurrentGameInfo';

export interface FeaturedGames {
    clientRefreshInterval: number;
    gameList: CurrentGameInfo[];
}
