import { ITeams } from '../Interfaces/teams/ITeams';
import { IMatches } from '../Interfaces/Matches/IMatches';
import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';

type Side = 'home' | 'away';

class LeaderboardsFunc {
  private teams: ITeams[];
  private matches: IMatches[];
  private type?: Side;
  private side: 'home' | 'away' = 'home';

  constructor(teams: ITeams[], matches: IMatches[], type?: Side, defaultSide: Side = 'home') {
    this.teams = teams;
    this.matches = matches;
    this.type = type;
    this.side = defaultSide;
  }

  private filterMatch(id: number): IMatches[] {
    return this.matches.filter((match) => {
      if (this.type === 'home') {
        return match.homeTeamId === id;
      }
      if (this.type === 'away') {
        return match.awayTeamId === id;
      }
      return true;
    });
  }

  private calculateTeamsScore(teamToAnalyze: ILeaderBoard, data: IMatches) {
    const teamRival = this.side === 'home' ? 'away' : 'home';
    const team = { ...teamToAnalyze };
    const sideGoals = `${this.side}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';
    const rivalGoals = `${teamRival}TeamGoals` as 'homeTeamGoals' | 'awayTeamGoals';

    team.goalsFavor += data[sideGoals];
    team.goalsOwn += data[rivalGoals];
    team.totalVictories += data[sideGoals] > data[rivalGoals] ? 1 : 0;
    team.totalLosses += data[sideGoals] < data[rivalGoals] ? 1 : 0;
    team.totalDraws += data[sideGoals] === data[rivalGoals] ? 1 : 0;
    team.goalsBalance = team.goalsFavor - team.goalsOwn;
    team.totalGames += 1;
    team.totalPoints = team.totalVictories * 3 + team.totalDraws;
    team.efficiency = parseFloat(((team.totalPoints / (3 * team.totalGames)) * 100).toFixed(2));

    return team;
  }

  private score(matches: IMatches[], team: string) {
    const defaultValue: ILeaderBoard = {
      name: team,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0 };

    const result = matches.reduce((acc: ILeaderBoard, cur: IMatches) => {
      if (acc.name === cur[`${this.side}Team`]?.teamName) {
        return this.calculateTeamsScore(acc, cur);
      }
      return acc;
    }, defaultValue); return result;
  }

  public tableLeaderboards() {
    const leaderboards = this.teams.map((team) =>
      this.score(this.filterMatch(team.id), team.teamName));

    return leaderboards;
  }
}

export default LeaderboardsFunc;
