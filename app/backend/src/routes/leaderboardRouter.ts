import { Request, Router, Response } from 'express';
import LeadBoardController from '../controllers/LeadBoardController';

const leadBoardController = new LeadBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leadBoardController.Home(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leadBoardController.Away(req, res),
);

export default router;
