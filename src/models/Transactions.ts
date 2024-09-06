export interface Transaction {
  id: string;
  invoice_number?: string;
  service_code: string;
  membership_id: string;
  type: 'PAYMENT' | 'TOPUP';
  amount: number;
  qty: number;
  created_at?: Date;
  updated_at?: Date;
}
