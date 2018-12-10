const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { pool } = require("../modules/db");
const { validateVideo } = require("../models/video");

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

// TODO - Swap les positions
router.put("/:id_video", async (req, res) => {
  const { error } = validateVideo(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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
  const query = `select *
  from playswift.reactions 
  where id_video_playlist = $1`;
  const values = [req.params.id_video];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

module.exports = router;
