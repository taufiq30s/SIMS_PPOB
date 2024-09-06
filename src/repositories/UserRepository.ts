import {PoolConnection, RowDataPacket} from 'mysql2/promise';
import {User} from '../models/User';

export default class UserRepository {
  public static async store(connection: PoolConnection, data: User) {
    return await connection.query('INSERT INTO users SET ?', data);
  }

  public static async isEmailExists(connection: PoolConnection, email: string) {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows.length > 0;
  }

  public static async getByEmail(connection: PoolConnection, email: string) {
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] as User;
  }
}
