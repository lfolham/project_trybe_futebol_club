import { Router } from 'express';
import teamRouter from './teamsRouter';
import authRouter from './Auth.router';

const router = Router();

router.use('/teams', teamRouter);
router.use(authRouter);

export default router;
