const express = require("express");
const router = express.Router();
const { pool } = require("../modules/db");

router.get("/me/playlists", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select pl.*, vi.url_thumbnail from playswift.playlists pl
    join playswift.videos_playlists vp on pl.id_playlist = vp.id_playlist
    join playswift.videos vi on vp.id_video = vi.id_video
    where pl.id_user = $1
    union 
	  select *, null from playswift.playlists where id_user = $1 
	  and id_playlist not in (select id_playlist from playswift.videos_playlists)`;
  const values = [req.body.id_user]
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

router.post("/me/subscriptions", async (req, res, next) => {
  console.log("  eqded");
  const client = await pool.connect();
  const query = `insert into playswift.subscriptions values(default, $1,$2) returning *`;
  const values = [req.body.id_tag, req.body.id_user];
  try {
    const result = await client.query(query, values);
    res.send(result.rows[0]);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
