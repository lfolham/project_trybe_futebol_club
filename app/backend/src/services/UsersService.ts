import UsersModel from '../models/UsersModel';
import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserServce {
  constructor(
    private usersModel: IUserModel = new UsersModel(),
  ) { }

  public async getById(id: number): Promise<ServiceResponse<IUser>> {
    const usersById = await this.usersModel.getById(id);
    if (!usersById) return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    const { username, role, email, password } = usersById as IUser;
    return { status: 'SUCCESSFUL', data: { id, username, role, email, password } };
  }
}
