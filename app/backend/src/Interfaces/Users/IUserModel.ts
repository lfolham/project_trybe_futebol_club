import { IUser } from './IUser';

export interface IUserModel {
  getByEmail(email: IUser['email']): Promise<IUser | null>
  getById(id: IUser['id']): Promise<IUser | null>
}
