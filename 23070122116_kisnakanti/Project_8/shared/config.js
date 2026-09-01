const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost', port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'ecommerce', user: process.env.POSTGRES_USER || 'ecommerce',
  password: process.env.POSTGRES_PASSWORD || 'ecommerce_demo_password'
});
module.exports = { pool };

