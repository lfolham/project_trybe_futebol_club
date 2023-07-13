import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>, InferCreationAttributes<SequelizeTeam>> {
    declare id: CreationOptional<number>;
    declare team_name: string;
}

SequelizeTeam.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    team_name: DataTypes.STRING,
  },
  {
    tableName: 'teams',
    underscored: true,
    timestamps: false,
    sequelize: db,
  },
);

export default SequelizeTeam;