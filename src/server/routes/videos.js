const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { pool } = require("../modules/db");

router.get("/:id_video", async (req, res) => {
  const client = await pool.connect();
  const query = `select * 
  from playswift.videos_playlists
  where id_video_playlist=$1`;
  const values = [req.params.id_video];
  try {
    const result = await client.query(query, values);
    res.send(result.rows[0]);
    logger.info("SELECT:videos/" + values);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

router.put("/:id_video", async (req, res) => {
  const client = await pool.connect();
  const query = `update playswift.videos_playlists
    set description=$1, position=$2
    where id_video_playlist=$3
    returning id_video_playlist,id_video,id_playlist,description,position`;
  const values = [req.body.description, req.body.position, req.params.id_video];
  try {
    const result = await client.query(query, values);
    res.send(result.rows[0]);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

router.delete("/:id_video", async (req, res) => {
  const client = await pool.connect();
  const query = `delete from playswift.videos_playlists where id_video_playlist=$1`;
  const values = [req.params.id_video];
  try {
    const result = await client.query(query, values);
    res.send(result);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

router.get("/:id_video/reactions", async (req, res) => {
  const client = await pool.connect();
  const query = `select r.*
  from playswift.videos_playlists vp,playswift.reactions r
  where vp.id_video_playlist=r.id_video_playlist and r.id_video_playlist=$1`;
  const values = [req.params.id_video];
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
