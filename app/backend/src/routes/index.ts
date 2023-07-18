import { Router } from 'express';
import teamRouter from './teamsRouter';
import authRouter from './Auth.router';
import matchesRouter from './matchesRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', authRouter);
router.use('/matches', matchesRouter);

export default router;
