import { IUserModel } from '../Interfaces/Users/IUserModel';
import SequelizeUser from '../database/models/UsersModel';
import { IUser } from '../Interfaces/Users/IUser';

export default class UsersModel implements IUserModel {
  private model = SequelizeUser;

  async getByEmail(email: IUser['email']): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return !dbData ? null : dbData;
  }
}
