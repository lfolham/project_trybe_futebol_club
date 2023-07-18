import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IMatches } from '../../Interfaces/Matches/IMatches';

export default{
    up(queryInterface: QueryInterface) {
        return queryInterface.createTable<Model<IMatches>>('matches', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        homeTeamId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'home_team_id',
            references: {
              model: 'teams',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          homeTeamGoals: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'home_team_goals',
          },
          awayTeamId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'away_team_id',
            references: {
              model: 'teams', 
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          awayTeamGoals: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'away_team_goals',
          },
          inProgress: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            field: 'in_progress',
          },
      });
    },

    down(queryInterface: QueryInterface) {
      return queryInterface.dropTable('matches');
    },
  };