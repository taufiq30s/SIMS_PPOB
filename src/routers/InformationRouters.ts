import {Router} from 'express';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware';
import InformationController from '../controllers/InformationController';

export const informationRoute = Router();

informationRoute.get(
  '/banner',
  AuthenticationMiddleware(),
  InformationController.getBanner
);
informationRoute.get(
  '/services',
  AuthenticationMiddleware(),
  InformationController.getServices
);
