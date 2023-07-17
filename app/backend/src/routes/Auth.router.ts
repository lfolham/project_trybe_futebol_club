import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Validations from '../middlewares/Validations';

const authRouter = Router();

const authController = new AuthController();

authRouter.post('/login', Validations.validateEmail, authController.login);

export default authRouter;
