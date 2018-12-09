const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { pool } = require("../modules/db");

router.delete("/:id_suggestion", async (req, res) => {
  const client = await pool.connect();
  const query = `delete from playswift.suggestions where id_suggestion = $1 and id_user = $2`;
  const values = [req.params.id_suggestion, req.body.id_user];
  try {
    const result = await client.query(query, values);
    res.send(result.rows[0]);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

module.exports = router;
