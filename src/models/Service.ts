import {RowDataPacket} from 'mysql2';

export interface Service extends RowDataPacket {
  service_code: string;
  service_name: string;
  service_icon?: string;
  service_tariff: number;
  created_at?: Date;
  updated_at?: Date;
}
