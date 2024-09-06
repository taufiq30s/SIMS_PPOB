import {RowDataPacket} from 'mysql2';

export interface TransactionBodyDto {
  top_up_amount?: number;
  service_code: string;
  membership_id: string;
}

export interface TransactionDto extends RowDataPacket {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}
