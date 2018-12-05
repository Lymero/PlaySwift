const { Client } = require("pg");
const logger = require("../modules/logger").logger;
/**
 * Connect to the database
 */
let connect = async () => {
  try {
    const client = new Client({
      database: process.env.DB_NAME,
      host: process.env.DB_URL,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    logger.info("Connecting to DB...");
    exports.db = await client.connect();
    logger.info("Connected to DB...");
  } catch (e) {
    logger.info("Unable to connect to DB...");
  }
};

/**
 * Exports
 */
exports.connect = connect;
exports.db = null; // db will be set after connected
