import {Request, Response} from 'express';
import AuthenticationService from '../service/AuthenticationService';
import {errorResponse, successResponse} from '../utils/responses';
import MembershipService from '../service/MembershipService';
import TransactionService from '../service/TransactionService';
import {validationResult} from 'express-validator';
import {TransactionBodyDto} from '../dto/TransactionDto';

export default class TransactionController {
  public static async getBalance(req: Request, res: Response) {
    try {
      // Get Member ID from jwt
      const memberId = AuthenticationService.getContext(
        req.headers.authorization!
      ).member_id;
      const balance = await MembershipService.getBalance(memberId);
      return successResponse(res, 200, 'Sukses', {
        balance: balance,
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }

  public static async topup(req: Request, res: Response) {
    try {
      // Check validation and return error if failed
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          400,
          102,
          'Input Validation Error',
          errors.array()
        );
      }

      // Get Member ID from jwt
      const memberId = AuthenticationService.getContext(
        req.headers.authorization!
      ).member_id;

      const body: TransactionBodyDto = {
        top_up_amount: req.body.top_up_amount,
        service_code: 'TOPUP',
        membership_id: memberId,
      };
      await TransactionService.topup(body);

      const balance = await MembershipService.getBalance(memberId);
      return successResponse(res, 200, 'Sukses', {
        balance: balance,
      });
    } catch (error) {
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      // Check validation and return error if failed
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          400,
          102,
          'Input Validation Error',
          errors.array()
        );
      }

      // Get Member ID from jwt
      const memberId = AuthenticationService.getContext(
        req.headers.authorization!
      ).member_id;

      const body: TransactionBodyDto = {
        service_code: req.body.service_code,
        membership_id: memberId,
      };
      const transactionId = await TransactionService.create(body);
      const transaction = await TransactionService.get(transactionId);

      return successResponse(res, 200, 'Sukses', transaction);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'INSUFFICIENT_BALANCE') {
          return errorResponse(res, 400, 104, 'Saldo tidak cukup');
        }
      }
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }

  public static async history(req: Request, res: Response) {
    try {
      // Get Member ID from jwt
      const memberId = AuthenticationService.getContext(
        req.headers.authorization!
      ).member_id;

      const offset = req.query.offset
        ? parseInt(req.query.offset as string, 10)
        : null;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : null;

      const transactions = await TransactionService.history(
        memberId,
        offset,
        limit
      );
      const data = {
        offset: offset ?? 0,
        limit: limit ?? transactions.length,
        transactions: transactions,
      };
      return successResponse(res, 200, 'Sukses', data);
    } catch (error) {
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }
}
