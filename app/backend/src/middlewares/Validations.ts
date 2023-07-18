import { NextFunction, Request, Response } from 'express';
import Email from '../validations/Email';
import { IUser } from '../Interfaces/Users/IUser';

class Validations {
  private static minLength = 6;

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as IUser;

    if (!email || !password) {
      return res.status(400).json({
        message: 'All fields must be filled',
      });
    }

    if (!Email.isValidEmail(email) || password.length < Validations.minLength) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    return next();
  }
}

export default Validations;
