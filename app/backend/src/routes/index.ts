import { Router } from 'express';
import teamRouter from './teamsRouter';

const router = Router();

router.use('/teams', teamRouter);

export default router;
