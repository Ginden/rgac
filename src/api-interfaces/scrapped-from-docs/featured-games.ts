import { CurrentGameInfo } from './current-game-info';

export interface FeaturedGames {
    clientRefreshInterval: number;
    gameList: CurrentGameInfo[];
}
