import {createPool} from 'mysql2/promise';
import {config} from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

export const pool = createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
