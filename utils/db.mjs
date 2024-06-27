// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;
import 'dotenv/config'

const connectionPool = new Pool({
  user: `${process.env.DB_USERNAME}`,
  host: "localhost",
  database: "DB-Social-Question-and-Answer_Website",
  password: `${process.env.DB_PASSWORD}`,
  port: 5432,
});


export default connectionPool;
