export interface Membership {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
  balance: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
