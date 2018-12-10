const express = require("express");
const router = express.Router();
const { pool } = require("../modules/db");

router.get("/me/playlists", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select * from playswift.playlists where id_user = $1 order by last_update_date desc`;
  const values = [req.body.id_user];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.get("/me/subscriptions", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select * from playswift.subscriptions where id_user = $1 order by id_tag`;
  const values = [req.body.id_user];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
