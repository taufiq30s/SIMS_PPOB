/* eslint-disable no-useless-catch */
import {PoolConnection, RowDataPacket} from 'mysql2/promise';
import {ServiceDto} from '../dto/ServiceDto';
import {Service} from '../models/Service';

export default class ServiceRepository {
  public static async getAll(connection: PoolConnection) {
    const [rows] = await connection.query<Service[]>(
      `SELECT 
        code AS service_code,
        name AS service_name,
        icon AS service_icon,
        tariff AS service_tariff FROM services WHERE code <> "TOPUP"`
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
