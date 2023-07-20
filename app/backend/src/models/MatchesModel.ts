import SequelizeTeam from '../database/models/TeamsModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import SequelizeMatches from '../database/models/MatchesModel';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { NewEntity } from '../Interfaces';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return dbData.map((matches) => (
      matches
    ));
  }

  async findByQuery(inProgress: boolean): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData.map((matches) => (
      matches
    ));
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatches = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async endMatche(id:IMatches['id'], data: Partial<NewEntity<IMatches>>): Promise<IMatches | null> {
    const [affectedRows] = await this.model.update(data, { where: { id } });
    if (affectedRows === 0) return null;

    return this.findById(id);
  }
}
