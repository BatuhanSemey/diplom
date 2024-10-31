// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'diplom',
//   password: 'subaru667',
//   port: 5432, 
// });

// module.exports = pool;

import { config } from 'dotenv';
config();

import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных', err.stack);
  } else {
    console.log('Успешное подключение к базе данных');
  }
});

export default pool;


