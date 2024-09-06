import {NextFunction, Request, Response} from 'express';
import AuthenticationService from '../service/AuthenticationService';
import {errorResponse} from '../utils/responses';
import {redisClient} from '../service/RedisService';

export default () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Bypass CORS OPTIONS
      if (
        req.method === 'OPTIONS' &&
        req.headers.origin &&
        req.headers['access-control-request-method']
      ) {
        return next();
      }

      // Validation token
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return errorResponse(
          res,
          401,
          108,
          'Token tidak tidak valid atau kadaluwarsa'
        );
      }
      const user = await AuthenticationService.tokenValidation(token);
      if (!user) {
        return errorResponse(
          res,
          401,
          108,
          'Token tidak tidak valid atau kadaluwarsa'
        );
      }
      const isExpired = await (await redisClient).GET(`blacklist_${token}`);
      if (isExpired) {
        return errorResponse(
          res,
          401,
          108,
          'Token tidak tidak valid atau kadaluwarsa'
        );
      }
      return next();
    } catch (error) {
      return errorResponse(
        res,
        401,
        108,
        'Token tidak tidak valid atau kadaluwarsa'
      );
    }
  };
};
