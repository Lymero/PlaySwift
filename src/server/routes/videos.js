const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { pool } = require("../modules/db");
const { validateVideo } = require("../models/video");
const { validateReaction } = require("../models/reaction");
const httpStatus = require("http-status");
const createError = require("http-errors");

router.get("/:id_video", async (req, res, next) => {
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
    return next(err);
  } finally {
    client.release();
  }
});

// TODO - Swap les positions
router.put("/:id_video", async (req, res, next) => {
  const { error } = validateVideo(req.body, req.params);
  if (error) {
    return next(createError(httpStatus.BAD_REQUEST, error.details[0].message));
  }
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
    return next(err);
  } finally {
    client.release();
  }
});

router.delete("/:id_video", async (req, res, next) => {
  const client = await pool.connect();
  const queryOwnership = `select * from playswift.playlists pl, playswift.videos_playlists vp where vp.id_playlist = pl.id_playlist and vp.id_video_playlist = $1 and pl.id_user = $2`
  const valuesOwnership = [req.params.id_video, req.body.id_user];
  const queryDeleteVideo = `delete from playswift.videos_playlists where id_video_playlist = $1`;
  const valuesDeleteVideo = [req.params.id_video];
  try {
    const ownership = await client.query(queryOwnership, valuesOwnership);
    if (ownership.rowCount <= 0) {
      return next(createError(httpStatus.FORBIDDEN, "Not the owner of the playlist"));
    }
    const result = await client.query(queryDeleteVideo, valuesDeleteVideo);
    res.send(result);
  } catch (err) {
    console.log(err.stack)
    return next(err);
  } finally {
    client.release();
  }
});

router.get("/:id_video/reactions", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select *
  from playswift.reactions 
  where id_video_playlist = $1`;
  const values = [req.params.id_video];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.post("/:id_video/reactions", async (req, res, next) => {
  const { error } = validateReaction(req.body, req.params);
  if (error) {
    return next(createError(httpStatus.BAD_REQUEST, error.details[0].message));
  }
  const client = await pool.connect();
  const queryInsertReaction = `insert into playswift.reactions
  values (default,$1,$2,$3,default,$4) returning id_reaction, id_video_playlist, vote, comment,id_user`;

  const queryUpdateNbLikesPlaylist = `update playswift.playlists 
  set dislikes_number=${
    req.body.vote === "dislike" ? "dislikes_number+1" : "dislikes_number"
  }, likes_number=${
    req.body.vote === "like" ? "likes_number+1" : "likes_number"
  } where id_playlist=${req.body.id_playlist}`;

  const queryUpdateNbLikesVideo = `update playswift.videos_playlists 
  set dislikes_number=${
    req.body.vote === "dislike" ? "dislikes_number+1" : "dislikes_number"
  }, likes_number=${
    req.body.vote === "like" ? "likes_number+1" : "likes_number"
  } where id_video_playlist=${req.body.id_video_playlist}`;

  const values = [
    req.params.id_video,
    req.body.vote,
    req.body.comment,
    req.body.id_user
  ];
  try {
    await client.query("BEGIN");
    const result = await client.query(queryInsertReaction, values);
    await client.query(queryUpdateNbLikesPlaylist);
    await client.query(queryUpdateNbLikesVideo);
    res.send(result.rows);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    return next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
