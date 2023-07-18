import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Validations from '../middlewares/Validations';
import UsersModel from '../models/UsersModel';

const authRouter = Router();

const userModel = new UsersModel();
const authController = new AuthController(userModel);

authRouter.post(
  '/',
  Validations.validateLogin,
  (req, res) => authController.login(req, res),
);

authRouter.get(
  '/role',
  Validations.validateToken,
  (req, res) => authController.login(req, res),
);
export default authRouter;
