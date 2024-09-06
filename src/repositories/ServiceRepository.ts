/* eslint-disable no-useless-catch */
import {PoolConnection, RowDataPacket} from 'mysql2/promise';
import {ServiceDto} from '../dto/ServiceDto';

export default class ServiceRepository {
  public static async getAll(connection: PoolConnection) {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM services WHERE code <> "TOPUP"'
    );
    return rows;
  }

  public static async isServiceCodeExists(
    connection: PoolConnection,
    code: string
  ) {
    const [[rows]] = await connection.query<RowDataPacket[]>(
      'SELECT COUNT(*) FROM services WHERE code = ?',
      [code]
    );
    return rows;
  }

  public static async get(connection: PoolConnection, code: string) {
    const [[rows]] = await connection.query<ServiceDto[]>(
      'SELECT code, name, tariff FROM services WHERE code = ?',
      [code]
    );
    return rows;
  }
}
