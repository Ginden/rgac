import { LeagueEntryDTO } from '../api-interfaces';
import { RankedTier } from '../api-interfaces';
import { ChildClient } from '../ChildClient';
import { RankedQueue } from '../api-interfaces';
import { RankedDivision } from '../api-interfaces';

export class LeagueExpClient extends ChildClient {
    public async entries(
        queue: RankedQueue,
        tier: RankedTier,
        division: RankedDivision,
        page = 1
    ): Promise<LeagueEntryDTO[]> {
        return this.entriesRaw(queue, tier, division, page);
    }

    public async *entriesIterable(
        queue: RankedQueue,
        tier: RankedTier,
        division: RankedDivision
    ): AsyncIterable<LeagueEntryDTO> {
        let entriesLength = 0;
        let page = 1;
        do {
            const data = await this.entriesRaw(queue, tier, division, page);
            entriesLength = data.length;
            yield* data;
            page += 1;
        } while (entriesLength > 0);
    }

    private entriesRaw(
        queue: RankedQueue,
        tier: RankedTier,
        division: RankedDivision,
        page: number
    ): Promise<LeagueEntryDTO[]> {
        return this.client.doRequest({
            url: `/lol/league-exp/v4/entries/${queue}/${tier}/${division}`,
            params: {
                page,
            },
        });
    }
}
