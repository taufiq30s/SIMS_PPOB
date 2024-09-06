/* eslint-disable no-useless-catch */
import {PoolConnection, RowDataPacket} from 'mysql2/promise';
import {Membership} from '../models/Membership';
import {ProfileDto} from '../dto/ProfileDto';
import {MemberUpdateDto} from '../dto/MemberDto';

export default class MembershipRepository {
  public static async storeMember(
    connection: PoolConnection,
    data: Membership
  ) {
    await connection.query('INSERT INTO memberships SET ?', data);
  }

  public static async getByUserId(connection: PoolConnection, userId: string) {
    const [[rows]] = await connection.query<RowDataPacket[]>(
      'SELECT * FROM memberships WHERE user_id = ?',
      [userId]
    );
    return rows;
  }

  public static async getProfile(connection: PoolConnection, id: string) {
    const [[rows]] = await connection.query<ProfileDto[]>(
      `SELECT users.email, first_name, last_name, profile_image 
      FROM memberships 
      JOIN users ON users.id = memberships.user_id 
      WHERE memberships.id = ?`,
      [id]
    );
    return rows;
  }

  public static async updateProfile(
    connection: PoolConnection,
    id: string,
    data: MemberUpdateDto
  ) {
    const [rows] = await connection.query(
      'UPDATE memberships SET first_name = ?, last_name = ? WHERE id = ?',
      [data.first_name, data.last_name, id]
    );
    return rows;
  }

  public static async updateProfileImage(
    connection: PoolConnection,
    id: string,
    path: string
  ) {
    const [rows] = await connection.query(
      'UPDATE memberships SET profile_image = ? WHERE id = ?',
      [path, id]
    );
    return rows;
  }

  public static async getBalance(connection: PoolConnection, id: string) {
    const [[rows]] = await connection.query<RowDataPacket[]>(
      'SELECT balance FROM memberships WHERE id = ?',
      [id]
    );
    return rows.balance;
  }
}
