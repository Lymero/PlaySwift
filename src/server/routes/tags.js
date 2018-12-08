const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { pool } = require("../modules/db");

router.get("/", async (req, res) => {
  const client = await pool.connect();
  const query = `select * from playswift.tags order by tag_name, id_tag`;
  try {
    const result = await client.query(query);
    res.send(result.rows);
    logger.info("SELECT:tags");
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

router.post("/", async (req, res) => {
  const client = await pool.connect();
  const query = `insert into playswift.tags
    values(default, $1)
    returning id_tag,name,tag_name`;
  const values = [req.body.tag_name];
  try {
    const result = await client.query(query, values);
    res.send(result.rows[0]);
    logger.info("INSERT:" + values);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

module.exports = router;
