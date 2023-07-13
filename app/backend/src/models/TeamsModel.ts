import SequelizeTeam from '../database/models/TeamsModel';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamsModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }
}
