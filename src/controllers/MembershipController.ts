import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {errorResponse, successResponse} from '../utils/responses';
import MembershipService from '../service/MembershipService';
import AuthenticationService from '../service/AuthenticationService';

export default class MembershipController {
  public static async registration(req: Request, res: Response) {
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

      // Send Body to Service
      await MembershipService.register(req.body);
      return successResponse(res, 201, 'Registrasi berhasil silahkan login');
    } catch (error) {
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      // Get Validation Result and return error
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

      const token = await AuthenticationService.login(
        req.body.email,
        req.body.password
      );

      // Return Response
      return successResponse(res, 200, 'Login Sukses', {
        token: token,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'CREDENTIAL_FAILED') {
          return errorResponse(res, 400, 103, 'Username atau password salah');
        }
      }
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }

  public static async getProfile(req: Request, res: Response) {
    try {
      const memberId = AuthenticationService.getContext(
        req.headers.authorization!
      ).member_id;
      const profile = await MembershipService.getProfile(memberId);
      return successResponse(res, 200, 'Sukses', profile);
    } catch (error) {
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }

  public static async update(req: Request, res: Response) {
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

      const memberId = AuthenticationService.getContext(
        req.headers.authorization!
      ).member_id;
      const profile = await MembershipService.updateProfile(memberId, req.body);
      return successResponse(res, 200, 'Sukses', profile);
    } catch (error) {
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }

  public static async updateProfileImage(req: Request, res: Response) {
    try {
      // Check validation and return error if failed
      const errors = validationResult(req);
      console.error(errors);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          400,
          102,
          'Input Validation Error',
          errors.array()
        );
      }

      const memberId = AuthenticationService.getContext(
        req.headers.authorization!
      ).member_id;
      const file = req.file!;
      const profile = await MembershipService.updateProfileImage(
        memberId,
        file
      );
      return successResponse(res, 200, 'Sukses', profile);
    } catch (error) {
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }
}
