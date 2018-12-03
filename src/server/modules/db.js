/**
 * Imports
 */
// TODO

/**
 * Variables
 */
// Connection URL
const URL = process.env.DB_URL;
// Database Name
const DB_NAME = process.env.DB_DB;

/**
 * Connect to the database
 */
let connect = () => {
    // TODO
};

/**
 * Exports
 */
exports.connect = connect;
exports.db = null; // db will be set after connected