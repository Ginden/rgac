import { LeagueEntryDTO } from '../apiInterfaces';
import { RankedTier } from '../apiInterfaces';
import { ChildClient } from '../ChildClient';
import { WithNextPage } from '../types';
import { RankedQueue } from '../apiInterfaces';
import { RankedDivision } from '../apiInterfaces';

export class LeagueExpClient extends ChildClient {
    public async entries(
        queue: RankedQueue,
        tier: RankedTier,
        division: RankedDivision,
        page: number = 1
    ): Promise<WithNextPage<LeagueEntryDTO[]>> {
        return {
            data: await this.entriesRaw(queue, tier, division, page),
            getNextPage: () => this.entries(queue, tier, division, page + 1),
        };
    }

    public async *entriesIterable(
        queue: RankedQueue,
        tier: RankedTier,
        division: RankedDivision,
        page: number = 1
    ): AsyncIterable<LeagueEntryDTO> {
        let entriesLength: number = 0;
        do {
            const data = await this.entriesRaw(queue, tier, division, page);
            yield* data;
            page += 1;
        } while (entriesLength > 0);
    }

    private entriesRaw(
        queue: RankedQueue,
        tier: RankedTier,
        division: RankedDivision,
        page: number = 1
    ): Promise<LeagueEntryDTO[]> {
        return this.client.doRequest({
            url: `/lol/league-exp/v4/entries/${queue}/${tier}/${division}`,
            params: {
                page,
            },
        });
    }
}
