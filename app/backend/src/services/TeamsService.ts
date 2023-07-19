import TeamsModel from '../models/TeamsModel';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamModel = new TeamsModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamsById(id: number): Promise<ServiceResponse<ITeams>> {
    const teamsById = await this.teamsModel.findById(id);
    if (!teamsById) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: teamsById };
  }
}
