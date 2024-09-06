import {createPool} from 'mysql2/promise';

if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(({config}) => {
    config();
  });
}

export const pool = createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
