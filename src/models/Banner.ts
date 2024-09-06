import {RowDataPacket} from 'mysql2';

export interface Banner extends RowDataPacket {
  banner_name: string;
  banner_image: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}
