import MatchesModel from '../models/MatchesModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

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
}
