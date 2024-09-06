import {compare} from 'bcrypt';
import UserRepository from '../repositories/UserRepository';
import {pool} from './MySQLDatabaseService';
import MembershipRepository from '../repositories/MembershipRepository';
import {PoolConnection} from 'mysql2/promise';
import {JwtPayload, sign, verify} from 'jsonwebtoken';
import {jwtDecode} from 'jwt-decode';
import {ContextDto, UserContextDto} from '../dto/UserContextDto';

export default class AuthenticationService {
  private static readonly TOKEN_TIMEOUT = 60 * 60 * 24;

  public static async login(email: string, password: string) {
    const connection = await pool.getConnection();
    // Validate identification
    const isExists = await UserRepository.isEmailExists(connection, email);
    if (!isExists) {
      throw new Error('CREDENTIAL_FAILED');
    }

    // Get user by email
    const user = await UserRepository.getByEmail(connection, email);

    // Check user is not active or password missmatch
    if (!(await compare(password, user.password))) {
      throw new Error('CREDENTIAL_FAILED');
    }

    // Sign the token
    const payload = await this.createClaims(connection, user.id);
    const token = sign(payload, process.env.APP_KEY!);

    // Return token and user context
    return token;
  }

  private static async createClaims(
    connection: PoolConnection,
    userId: string
  ) {
    const member = await MembershipRepository.getByUserId(connection, userId);
    const sub = member.first_name;
    const context: UserContextDto = {
      userId: member.user_id,
      member_id: member.id,
      displayName: member.first_name + ' ' + member.last_name,
    };
    return {
      iss: 'sims_ppob',
      sub: sub,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.TOKEN_TIMEOUT,
      context: context!,
    };
  }

  public static async tokenValidation(token: string) {
    const payload = verify(token, process.env.APP_KEY!) as JwtPayload;
    return payload;
  }

  public static getContext(token: string) {
    const payload: ContextDto = jwtDecode(token);
    return payload.context;
  }
}
