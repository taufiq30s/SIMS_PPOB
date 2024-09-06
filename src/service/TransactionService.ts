import {TransactionBodyDto} from '../dto/TransactionDto';
import {Transaction} from '../models/Transactions';
import MembershipRepository from '../repositories/MembershipRepository';
import ServiceRepository from '../repositories/ServiceRepository';
import TransactionRepository from '../repositories/TransactionRepository';
import {pool} from './MySQLDatabaseService';
import {v4 as uuidv4} from 'uuid';

export default class TransactionService {
  public static async topup(body: TransactionBodyDto) {
    const transaction: Transaction = {
      id: uuidv4(),
      service_code: body.service_code,
      membership_id: body.membership_id,
      type: 'TOPUP',
      amount: body.top_up_amount || 0,
      qty: 1,
    };
    const connection = await pool.getConnection();
    await TransactionRepository.store(connection, transaction);
    connection.release();
  }

  public static async create(body: TransactionBodyDto) {
    const id = uuidv4();
    const connection = await pool.getConnection();
    // Get Service
    const service = await ServiceRepository.get(connection, body.service_code);

    // Check Balance
    const balance = await MembershipRepository.getBalance(
      connection,
      body.membership_id
    );
    if (balance - (0 + service.tariff) < 0) {
      throw new Error('INSUFFICIENT_BALANCE');
    }

    // Store Transaction
    const transaction: Transaction = {
      id: id,
      service_code: body.service_code,
      membership_id: body.membership_id,
      type: 'PAYMENT',
      amount: 0 + service.tariff,
      qty: 1,
    };

    await TransactionRepository.store(connection, transaction);
    connection.release();
    return id;
  }

  public static async get(id: string) {
    const connection = await pool.getConnection();
    const transaction = await TransactionRepository.get(connection, id);
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    connection.release();
    return transaction;
  }

  public static async history(
    memberId: string,
    offset: number | null,
    limit: number | null
  ) {
    const connection = await pool.getConnection();
    const transactions = await TransactionRepository.history(
      connection,
      memberId,
      offset,
      limit
    );
    connection.release();
    return transactions;
  }
}
