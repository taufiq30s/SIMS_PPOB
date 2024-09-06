/* eslint-disable no-useless-catch */
import {PoolConnection} from 'mysql2/promise';
import {Banner} from '../models/Banner';

export default class BannerRepository {
  public static async get(connection: PoolConnection) {
    const [rows] = await connection.query<Banner[]>(
      `SELECT
        name AS banner_name,
        image AS banner_image,
        description
      FROM banners`
    );
    return rows;
  }
}
