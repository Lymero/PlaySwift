const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { pool } = require("../modules/db");
const { getYoutubeVideo } = require("../modules/google/youtube");
const { validatePlaylist } = require("../models/playlist");
const { validateVideo } = require("../models/video");
const { validateSuggestion } = require("../models/video");

router.get("/", async (req, res) => {
  const client = await pool.connect();
  const query = `select * from playswift.playlists where visible=true`;
  try {
    const result = await client.query(query);
    res.send(result.rows);
    logger.info("SELECT:playlists");
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

router.post("/", async (req, res) => {
  const { error } = validatePlaylist(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const client = await pool.connect();
  const query = `insert into playswift.playlists
    values(default, $1, $2, $3, $4, default, default, $5, default, default)
    returning id_playlist,name,id_tag,visible,id_user,creation_date,last_update_date,description,likes_number,dislikes_number`;
  const values = [
    req.body.name,
    req.body.id_tag,
    req.body.visible,
    req.body.id_user,
    req.body.description
  ];
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

router.put("/:id_playlist", async (req, res) => {
  const { error } = validatePlaylist(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const client = await pool.connect();
  const query = `update playswift.playlists
    set name=$1, visible=$2, description=$3
    where id_playlist = $4 and id_user = $5
    returning id_playlist,name,id_tag,visible,id_user,creation_date,last_update_date,description,likes_number,dislikes_number`;
  const values = [
    req.body.name,
    req.body.visible,
    req.body.description,
    req.params.id_playlist,
    req.body.id_user
  ];
  try {
    const result = await client.query(query, values);
    res.send(result.rows[0]);
    logger.info("UPDATE:" + values);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

router.delete("/:id_playlist", async (req, res) => {
  const client = await pool.connect();
  const query = `delete from playswift.playlists 
  where id_playlist = $1 and id_user = $2 
  returning id_playlist,name,id_tag,visible,id_user,creation_date,last_update_date,description,likes_number,dislikes_number`;
  const values = [req.params.id_playlist, req.body.id_user];
  try {
    await client.query("BEGIN");
    const result = await client.query(query, values);
    res.send(result.rows[0]);
    logger.info("DELETE:" + values);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

router.get("/:id_playlist/videos", async (req, res) => {
  const client = await pool.connect();
  const query = `select vp.id_video_playlist, vp.id_playlist, vp.id_video, vp.description, vp.position, v.id_video, v.url_video, v.video_length, v.title, v.url_thumbnail
  from playswift.videos_playlists vp
  inner join playswift.videos v
  on vp.id_video = v.id_video
  where vp.id_playlist=$1`;

  const values = [req.params.id_playlist];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
    logger.info("SELECT " + values);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

router.post("/:id_playlist/videos", async (req, res) => {
  const { error } = validateVideo(req.body, req.params);
  if (error) return res.status(400).send(error.details[0].message);
  const { id_playlist } = req.params;
  const { url_video, description, id_user } = req.body;

  const client = await pool.connect();
  const queryOwnerOfPlaylist = `select count(*) from playswift.playlists where id_user=$1 and id_playlist=$2`;
  const queryDoesVideoExist = `select count(id_video) from playswift.videos where url_video = $1`;
  const queryVideoPosition = `select max(position) from playswift.videos_playlists where id_playlist = $1`;
  const queryInsertVideo = `insert into playswift.videos values(default, $1, 0, $2, $3) returning id_video, url_video`;
  const queryInsertVideoPlaylist = `insert into playswift.videos_playlists values(default, $1, $2, $3, $4)`;
  const queryExistingVideo = `select id_video, url_video from playswift.videos where url_video = $1`;

  try {
    await client.query("BEGIN");
    let values = [id_user, id_playlist];
    logger.info("QUERY queryOwnerOfPlaylist : " + queryOwnerOfPlaylist);
    let result = await client.query(queryOwnerOfPlaylist, values);
    if (result.rows[0].count) {
      return res.status(400).send("User does not own this playlist");
    }
    logger.info("QUERY queryDoesVideoExist : " + queryDoesVideoExist);
    values = [id_playlist];
    logger.info("QUERY queryVideoPosition : " + queryVideoPosition);
    result = await client.query(queryDoesVideoExist, values);

    const position =
      (await client.query(queryVideoPosition, values)).rows[0].max + 1;

    // if it doesn't, add it to db
    if (result.rows[0].count == 0) {
      getYoutubeVideo(url_video, async resp => {
        const { title } = resp[0].snippet;
        const { url } = resp[0].snippet.thumbnails.high;
        values = [url_video, title, url];
        logger.info("QUERY queryInsertVideo : " + queryInsertVideo);
        const new_video = (await client.query(queryInsertVideo, values))
          .rows[0];
        values = [id_playlist, new_video.id_video, description, position];
        logger.info(
          "QUERY queryInsertVideoPlaylist : " + queryInsertVideoPlaylist
        );
        await client.query(queryInsertVideoPlaylist, values);
        res.send(new_video);
      });
    } else {
      // else we can directly create the videos_playlists entity
      values = [url_video];
      logger.info("QUERY queryExistingVideo : " + queryExistingVideo);
      const new_video = (await client.query(queryExistingVideo, values))
        .rows[0];
      values = [id_playlist, new_video.id_video, description, position];
      logger.info(
        "QUERY queryInsertVideoPlaylist : " + queryInsertVideoPlaylist
      );
      await client.query(queryInsertVideoPlaylist, values);
      res.send(new_video);
    }
    await client.query("COMMIT");
  } catch (err) {
    console.log(err);
    await client.query("ROLLBACK");
    logger.warn("POST /playlists/:id_playlist/videos : " + err);
    res.status("500").send();
  } finally {
    client.release();
  }
});

router.get("/:id_playlist/suggestions", async (req, res) => {
  const client = await pool.connect();
  const query = `select * from playswift.suggestions where id_playlist = $1 and state = 'pending'`;
  const values = [req.params.id_playlist];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

router.post("/:id_playlist/suggestions", async (req, res) => {
  const { error } = validateSuggestion(req.body, req.params);
  if (error) return res.status(400).send(error.details[0].message);

  const { id_playlist } = req.params;
  const { url_video, id_user } = req.body;

  const client = await pool.connect();
  const queryInsertSuggestion = `insert into playswift.suggestions values(default, $1, $2, 'pending', $3)`;
  const queryExistingVideo = `select id_video, url_video from playswift.videos where url_video = $1`;
  const queryInsertVideo = `insert into playswift.videos values(default, $1, 0, $2, $3) returning id_video, url_video`;
  try {
    await client.query("BEGIN");
    let values = [url_video];
    let video = await client.query(queryExistingVideo, values);
    if (video.rowCount === 0) {
      getYoutubeVideo(url_video, async resp => {
        const { title } = resp[0].snippet;
        const { url } = resp[0].snippet.thumbnails.high;
        values = [url_video, title, url];
        const newVideo = (await client.query(queryInsertVideo, values)).rows;
        values = [id_playlist, newVideo.rows[0].id_video, id_user];
        const insertedSuggestion = await client.query(
          queryInsertSuggestion,
          values
        );
        res.send(insertedSuggestion.rows[0]);
      });
    } else {
      values = [id_playlist, video.rows[0].id_video, id_user];
      const insertedSuggestion = await client.query(
        queryInsertSuggestion,
        values
      );
      res.send(insertedSuggestion.rows[0]);
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).send();
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

module.exports = router;
