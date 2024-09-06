/* eslint-disable no-useless-catch */
import {PoolConnection, RowDataPacket} from 'mysql2/promise';

export default class BannerRepository {
  public static async get(connection: PoolConnection) {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM banners'
    );
    return rows;
  }
}
