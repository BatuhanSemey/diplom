import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'diplom',
  password: 'subaru667',
  port: 5432, 
});

module.exports = pool;