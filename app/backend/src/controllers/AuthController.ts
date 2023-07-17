import { Request, Response } from 'express';

export default class AuthController {
  // eslint-disable-next-line class-methods-use-this
  async login(req : Request, res: Response) {
    return res.status(200).json({
      token: 'alguma coisa',
    });
  }
}
