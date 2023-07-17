import { NextFunction, Request, Response } from 'express';
import Email from '../validations/Email';

class Validations {
  static validateEmail(req: Request, res: Response, next: NextFunction) : Response | void {
    const { email } = req.body as { email: string, password: string };

    if (!Email.validate(email)) {
      return res.status(401).json({
        message: 'invalid email or password',
      });
    }
    next();
  }

  static validatePassword(req: Request, res: Response, next: NextFunction) : Response | void {
    const { password } = req.body as { password: string };

    if (password.length < 6) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }
    next();
  }
}

export default Validations;
