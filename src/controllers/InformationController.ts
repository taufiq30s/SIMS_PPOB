import {Request, Response} from 'express';
import InformationService from '../service/InformationService';
import {errorResponse, successResponse} from '../utils/responses';

export default class InformationController {
  public static async getBanner(req: Request, res: Response) {
    try {
      // Get Banner
      const banners = await InformationService.getBanners();
      return successResponse(res, 200, 'Sukses', banners);
    } catch (error) {
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }

  public static async getServices(req: Request, res: Response) {
    try {
      // Get Services
      const services = await InformationService.getServices();
      return successResponse(res, 200, 'Sukses', services);
    } catch (error) {
      return errorResponse(res, 500, 101, 'Internal Server Error', error);
    }
  }
}
