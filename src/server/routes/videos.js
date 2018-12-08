const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.get("/:id_video", async (req, res) => {
  const text = `select * 
  from playswift.videos_playlists
  where id_video_playlist=$1`;
  const values = [req.params.id_video];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send(result.rows[0]);
    logger.info("SELECT:videos/" + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.put("/:id_video", async (req, res) => {
  const text = `update playswift.videos_playlists
    set description=$1, position=$2
    where id_video_playlist=$3
    returning id_video_playlist,id_video,id_playlist,description,position`;
  const values = [req.body.description, req.body.position, req.params.id_video];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send(result.rows[0]);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.delete("/:id_video", async (req, res) => {
  const text = `delete from playswift.videos_playlists where id_video_playlist=$1`;
  const values = [req.params.id_video];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send(result);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.get("/:id_video/reactions", async (req, res) => {
  const text = `select r.*
  from playswift.videos_playlists vp,playswift.reactions r
  where vp.id_video_playlist=r.id_video_playlist and r.id_video_playlist=$1`;
  const values = [req.params.id_video];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send(result.rows[0]);
  } catch (err) {
    logger.info(err.stack);
  }
});

module.exports = router;
