const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { pool } = require("../modules/db");
const { validateTag } = require("../models/tag");
const httpStatus = require("http-status");
const createError = require("http-errors");

router.get("/", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select * from playswift.tags order by tag_name, id_tag`;
  try {
    const result = await client.query(query);
    res.send(result.rows);
    logger.info("SELECT:tags");
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.post("/", async (req, res, next) => {
  const { error } = validateTag(req.body);
  if (error) {
    return next(createError(httpStatus.BAD_REQUEST, error.details[0].message));
  }
  const client = await pool.connect();
  const query = `insert into playswift.tags
    values(default, $1)
    returning id_tag,tag_name`;
  const values = [req.body.tag_name];
  try {
    const result = await client.query(query, values);
    res.send(result.rows[0]);
    logger.info("INSERT:" + values);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
