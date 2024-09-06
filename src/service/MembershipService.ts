import {User} from '../models/User';
import {v4 as uuidv4} from 'uuid';
import {pool} from './MySQLDatabaseService';
import UserRepository from '../repositories/UserRepository';
import {Membership} from '../models/Membership';
import MembershipRepository from '../repositories/MembershipRepository';
import {hash} from 'bcrypt';
import {MemberRegisterDto, MemberUpdateDto} from '../dto/MemberDto';

export default class MembershipService {
  public static async register(body: MemberRegisterDto) {
    const user: User = {
      id: uuidv4(),
      email: body.email,
      password: await hash(body.password, 10),
    };

    const member: Membership = {
      id: uuidv4(),
      user_id: user.id,
      first_name: body.first_name,
      last_name: body.last_name,
      balance: 0,
    };

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await UserRepository.store(connection, user);
      await MembershipRepository.store(connection, member);
      await connection.commit();
    } catch (transactionError) {
      await connection.rollback();
      throw transactionError;
    } finally {
      connection.release();
    }
  }

  public static async isEmailExists(email: string) {
    const connection = await pool.getConnection();
    const result = await UserRepository.isEmailExists(connection, email);
    connection.release();
    return result;
  }

  public static async getBalance(id: string) {
    const connection = await pool.getConnection();
    const balance = await MembershipRepository.getBalance(connection, id);
    return parseInt(balance);
  }

  public static async getProfile(id: string) {
    const connection = await pool.getConnection();
    const profile = await MembershipRepository.getProfile(connection, id);
    connection.release();
    return profile;
  }

  public static async updateProfile(id: string, body: MemberUpdateDto) {
    const connection = await pool.getConnection();
    await MembershipRepository.updateProfile(connection, id, body);
    const profile = await MembershipRepository.getProfile(connection, id);
    connection.release();
    return profile;
  }

  public static async updateProfileImage(
    id: string,
    image: Express.Multer.File
  ) {
    console.log(image);
    const path = `uploads/${image.filename}`;
    const connection = await pool.getConnection();
    await MembershipRepository.updateProfileImage(connection, id, path);
    const profile = await MembershipRepository.getProfile(connection, id);
    if (profile.profile_image !== null) {
      profile.profile_image = `${process.env.APP_URL}/${profile.profile_image}`;
    }
    return profile;
  }
}
