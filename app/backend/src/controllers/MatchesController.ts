import { Request, Response } from 'express';

import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const progress = inProgress === 'true';
      const serviceResponse = await this.matchesService.findByQuery(progress);
      return res.status(200).json(serviceResponse.data);
    }

    const serviceResponse = await this.matchesService.getAllMatches();
    res.status(200).json(serviceResponse.data);
  }

  public async endMatch(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const serviceResponse = await this.matchesService.endMatch(id);

    return res.status(200).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceResponse = await this.matchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async createMath(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchesService.createMath(req.body);

    return res.status(201).json(serviceResponse.data);
  }
}
