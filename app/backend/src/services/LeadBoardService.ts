import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';
import LeaderboardsFunc from '../utils/leaderBoard';

export default class LeadBoardService {
  constructor(
    private matchesModel: MatchesModel = new MatchesModel(),
    private teamsModel: TeamsModel = new TeamsModel(),
  ) { }

  public async Home(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchesModel.findByQuery(false);
    const teams = await this.teamsModel.findAll();
    const leaderboards = (new LeaderboardsFunc(teams, matches, 'home')).tableLeaderboards();
    return { status: 'SUCCESSFUL', data: leaderboards };
  }

  public async Away(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const matches = await this.matchesModel.findByQuery(false);
    const teams = await this.teamsModel.findAll();
    const leaderboards = (new LeaderboardsFunc(teams, matches, 'away')).tableLeaderboards();
    return { status: 'SUCCESSFUL', data: leaderboards };
  }
}
