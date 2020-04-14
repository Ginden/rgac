import { ChildClient } from '../ChildClient';
import { ClashTeam, SummonerId, ClashTournament } from '../types';

export class ClashClient extends ChildClient {
    public playersBySummoner(summoner: SummonerId): never {
        throw new Error('Not implemented yet');
    }

    public teamsByTeamId(team: ClashTeam): never {
        throw new Error('Not implemented yet');
    }

    public tournaments(): never {
        throw new Error('Not implemented yet');
    }

    public tournamentsByTeam(team: ClashTeam): never {
        throw new Error('Not implemented yet');
    }

    public tournamentDetails(tournament: ClashTournament): never {
        throw new Error('Not implemented yet');
    }
}
