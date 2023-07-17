import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import Validations from '../middlewares/Validations';
import UsersModel from '../models/UsersModel';

const authRouter = Router();

const userModel = new UsersModel();
const authController = new AuthController(userModel);

authRouter.post(
  '/login',
  Validations.validateEmail,
  Validations.validatePassword,
  (req, res) => authController.login(req, res),
);

export default authRouter;