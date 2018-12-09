const { Pool } = require("pg");
const {
  db_name,
  db_url,
  db_port,
  db_user,
  db_password
} = require("../config/vars");

const pool = new Pool({
  database: db_name,
  host: db_url,
  port: db_port,
  user: db_user,
  password: db_password
});
exports.pool = pool;
