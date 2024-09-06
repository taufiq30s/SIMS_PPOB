import {RowDataPacket} from 'mysql2';

export interface ProfileDto extends RowDataPacket {
  email: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
}
