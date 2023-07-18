import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

import SequelizeTeam from './TeamsModel';

class SequelizeMatches extends
  Model <InferAttributes<SequelizeMatches>, InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals: number;

  declare inProgress: boolean;
}

SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeTeam.belongsTo(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
SequelizeTeam.belongsTo(SequelizeMatches, { foreignKey: 'awayTeamId', as: 'awayTeam' });

SequelizeMatches.hasMany(SequelizeTeam, { foreignKey: 'homeTeamId', as: 'homeTeamsMatche' });
SequelizeMatches.hasMany(SequelizeTeam, { foreignKey: 'awayTeamId', as: 'awayTeamsMatche' });

export default SequelizeMatches;
