import { LeagueEntryDTO } from '../apiInterfaces/scrappedFromDocs/LeagueEntryDTO';
import { RankedTier } from '../apiInterfaces/manual/RankedTier';
import { ChildClient } from '../ChildClient';
import { WithNextPage } from '../types';
import { RankedQueue } from '../apiInterfaces/manual/RankedQueue';
import { RankedDivision } from '../apiInterfaces/manual/RankedDivision';

export class LeagueExpClient extends ChildClient {
    public async entries(
        queue: RankedQueue,
        tier: RankedTier,
        division: RankedDivision,
        page: number = 1
    ): Promise<WithNextPage<LeagueEntryDTO[]>> {
        return {
            data: await this.client.doRequest({
                url: `/lol/league-exp/v4/entries/${queue}/${tier}/${division}`,
                params: {
                    page
                }
            }),
            getNextPage: () => this.entries(queue, tier, division, page + 1)
        };
    }
}
