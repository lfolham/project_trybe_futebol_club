import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import JwtUtils from '../utils/jwtUtils';
import UsersModel from '../models/UsersModel';

export default class AuthController {
  // eslint-disable-next-line class-methods-use-this
  private userModel: IUserModel = new UsersModel();
  private jwtUtils = new JwtUtils();

  constructor(userModel: IUserModel) {
    this.userModel = userModel;
  }

  async login(req : Request, res: Response) {
    const { email, password } = req.body as IUser;
    const user = await this.userModel.getByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = this.jwtUtils.sign({ id: user.id });

    return res.status(200).json({
      token,
    });
  }
}
