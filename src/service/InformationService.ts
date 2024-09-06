import BannerRepository from '../repositories/BannerRepository';
import ServiceRepository from '../repositories/ServiceRepository';
import {pool} from './MySQLDatabaseService';

export default class InformationService {
  public static async getBanners() {
    const connection = await pool.getConnection();
    return await BannerRepository.get(connection);
  }

  public static async getServices() {
    const connection = await pool.getConnection();
    return await ServiceRepository.getAll(connection);
  }

  public static async getService(code: string) {
    const connection = await pool.getConnection();
    return await ServiceRepository.get(connection, code);
  }
}
