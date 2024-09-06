import {Router} from 'express';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware';
import TransactionController from '../controllers/TransactionController';
import {checkSchema} from 'express-validator';
import TopupRequest from '../requests/TopupRequest';
import TransactionRequest from '../requests/TransactionRequest';

export const transactionRoute = Router();

transactionRoute.use(
  ['/balance', '/topup', '/transaction', '/transaction/history'],
  AuthenticationMiddleware()
);

transactionRoute.get('/balance', TransactionController.getBalance);

transactionRoute.post(
  '/topup',
  checkSchema(TopupRequest),
  TransactionController.topup
);

transactionRoute.post(
  '/transaction',
  checkSchema(TransactionRequest),
  TransactionController.create
);

transactionRoute.get('/transaction/history', TransactionController.history);
