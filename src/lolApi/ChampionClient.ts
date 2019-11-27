import { ChampionInfo } from '../apiInterfaces';
import { ChildClient } from '../ChildClient';

export class ChampionClient extends ChildClient {
    /**
     * @description Returns champion rotations, including free-to-play and low-level free-to-play rotations
     * @link https://developer.riotgames.com/apis#champion-v3/GET_getChampionInfo
     * @return {Promise<ChampionInfo>}
     */
    public async rotation(): Promise<ChampionInfo> {
        return this.client.doRequest({
            url: `/lol/platform/v3/champion-rotations`
        });
    }
}
