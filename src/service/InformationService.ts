import BannerRepository from '../repositories/BannerRepository';
import ServiceRepository from '../repositories/ServiceRepository';
import {pool} from './MySQLDatabaseService';

export default class InformationService {
  public static async getBanners() {
    const connection = await pool.getConnection();
    const result = await BannerRepository.get(connection);
    return result;
  }

  public static async getServices() {
    const connection = await pool.getConnection();
    const result = await ServiceRepository.getAll(connection);
    return result;
  }

  public static async getService(code: string) {
    const connection = await pool.getConnection();
    return await ServiceRepository.get(connection, code);
  }
}
