import { Request, Response } from 'express';

import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const progress = inProgress === 'true';
      const serviceResponse = await this.matchesService
        .matchesInProgress(progress);
      return res.status(200).json(serviceResponse.data);
    }

    const serviceResponse = await this.matchesService.getAllMatches();
    res.status(200).json(serviceResponse.data);
  }
}
