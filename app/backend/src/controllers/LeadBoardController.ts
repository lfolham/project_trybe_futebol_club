import { Request, Response } from 'express';
import LeadBoardService from '../services/LeadBoardService';

export default class LeadBoardController {
  constructor(
    private leaderboardService = new LeadBoardService(),
  ) { }

  public async Home(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.Home();
    res.status(200).json(serviceResponse.data);
  }

  public async Away(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.Away();
    res.status(200).json(serviceResponse.data);
  }
}
