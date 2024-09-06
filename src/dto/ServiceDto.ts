import {RowDataPacket} from 'mysql2';

export interface ServiceDto extends RowDataPacket {
  code: string;
  name: string;
  tariff: number;
}
