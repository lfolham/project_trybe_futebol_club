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

  public async findByQuery(inProgress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findByQuery(inProgress);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async endMatch(id: number)
    : Promise<ServiceResponse<ServiceMessage>> {
    const matcheFound = await this.matchesModel.findById(id);
    if (!matcheFound) return { status: 'NOT_FOUND', data: { message: `Match  ${id} not found` } };

    const matchFinished = { inProgress: false };

    const updateMatch = await this.matchesModel.endMatche(id, matchFinished);
    if (!updateMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<ServiceResponse<ServiceMessage>> {
    const matcheFound = await this.matchesModel.findById(id);
    if (!matcheFound) return { status: 'NOT_FOUND', data: { message: `Match  ${id} not found` } };

    const updateResult = { homeTeamGoals, awayTeamGoals };

    const updateMatch = await this.matchesModel.endMatche(id, updateResult);
    if (!updateMatch) {
      return { status: 'CONFLICT',
        data: { message: `There are no updates to perform in Match ${id}` } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
