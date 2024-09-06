import {PoolConnection} from 'mysql2/promise';
import {TransactionBodyDto, TransactionDto} from '../dto/TransactionDto';

export default class TransactionRepository {
  public static async store(
    connection: PoolConnection,
    data: TransactionBodyDto
  ) {
    await connection.query('INSERT INTO transactions SET ?', data);
  }

  public static async get(connection: PoolConnection, id: string) {
    const [[rows]] = await connection.query<TransactionDto[]>(
      `SELECT 
        invoice_number,
        service_code,
        services.name AS service_name,
        type AS transaction_type,
        (amount *qty) AS total_amount,
        transactions.created_at AS created_on 
      FROM 
        transactions JOIN services ON transactions.service_code = services.code
      WHERE id = ?`,
      [id]
    );
    return rows;
  }

  public static async history(
    connection: PoolConnection,
    memberId: string,
    offset: number | null,
    limit: number | null
  ) {
    let queryString = `
      SELECT
        invoice_number,
        service_code,
        services.name AS service_name,
        type AS transaction_type,
        (amount *qty) AS total_amount,
        transactions.created_at AS created_on
      FROM
        transactions JOIN services ON transactions.service_code = services.code
      WHERE
        membership_id = ?
      ORDER BY transactions.created_at DESC
    `;
    const queryParams: unknown[] = [memberId];

    if (limit !== null) {
      queryString += ' LIMIT ?';
      queryParams.push(limit);

      if (offset !== null) {
        queryString += ' OFFSET ?';
        queryParams.push(offset);
      }
    }

    const [rows] = await connection.query<TransactionDto[]>(
      queryString,
      queryParams
    );
    return rows;
  }
}
