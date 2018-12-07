const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.get("/", async (req, res) => {
  try {
    await db.connect();
    const result = await db.query(
      `select * from playswift.tags order by tag_name, id_tag`
    );
    res.send(result.rows);
    logger.info("SELECT:tags");
  } catch (err) {
    logger.info(err.stack);
  }
});

router.post("/", async (req, res) => {
  const text = `insert into playswift.tags
    values(default, $1)
    returning id_tag,name,tag_name`;
  const values = [req.body.tag_name];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send(result.rows[0]);
    logger.info("INSERT:" + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

module.exports = router;
