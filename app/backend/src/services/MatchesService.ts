import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async matchesInProgress(inProgress: boolean):
  Promise<ServiceResponse<IMatches[]>> {
    const matchsIProgress = await this.matchesModel.matchesInProgress(inProgress);
    return { status: 'SUCCESSFUL', data: matchsIProgress };
  }

  public async endMatch(id: number, match: IMatches): Promise<ServiceResponse<ServiceMessage>> {
    const matcheFound = await this.matchesModel.findById(id);
    if (!matcheFound) return { status: 'NOT_FOUND', data: { message: `Match  ${id} not found` } };

    const updateMatch = await this.matchesModel.endMatche(id, match);
    if (!updateMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
