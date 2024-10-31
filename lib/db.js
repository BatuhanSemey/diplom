// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'diplom',
//   password: 'subaru667',
//   port: 5432, 
// });

// module.exports = pool;


import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Это может потребоваться для безопасного подключения на Vercel
  },
});

export default pool;