const express = require("express");
const router = express.Router();

const { pool } = require("../modules/db");
const { getYoutubeVideo } = require("../modules/google/youtube");
const { validatePlaylist } = require("../models/playlist");
const { validateVideo } = require("../models/video");
const { validateSuggestion } = require("../models/suggestion");
const httpStatus = require("http-status");
const createError = require("http-errors");

router.get("/", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select pl1.id_playlist,
  pl1.name,
  pl1.id_tag,
  ta.tag_name,
  pl1.visible,
  pl1.id_user,
  pl1.creation_date,
  pl1.last_update_date,
  pl1.description,
  pl1.likes_number,
  pl1.dislikes_number, 
  v.url_thumbnail
from playswift.playlists pl1
join playswift.videos_playlists vp on vp.id_playlist=pl1.id_playlist
join playswift.videos v on vp.id_video=v.id_video
join playswift.tags ta on pl1.id_tag=ta.id_tag 
where pl1.visible=true
group by pl1.id_playlist, v.url_thumbnail, vp.position, ta.tag_name
having vp.position=(
  select min(position)
  from playswift.videos_playlists pl2
  where pl1.id_playlist=pl2.id_playlist
) `;
  try {
    const result = await client.query(query);
    res.send(result.rows);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.post("/", async (req, res, next) => {
  const { error } = validatePlaylist(req.body);
  if (error) {
    return next(createError(httpStatus.BAD_REQUEST, error.details[0].message));
  }
  const client = await pool.connect();
  const query = `insert into playswift.playlists
    values(default, $1, $2, $3, $4, default, default, $5, default, default)
    returning *`;
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
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.put("/:id_playlist", async (req, res, next) => {
  const { error } = validatePlaylist(req.body);
  if (error) {
    return next(createError(httpStatus.BAD_REQUEST, error.details[0].message));
  }
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
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.delete("/:id_playlist", async (req, res, next) => {
  const client = await pool.connect();
  const query = `delete from playswift.playlists 
  where id_playlist = $1 and id_user = $2 
  returning id_playlist,name,id_tag,visible,id_user,creation_date,last_update_date,description,likes_number,dislikes_number`;
  const values = [req.params.id_playlist, req.body.id_user];
  try {
    await client.query("BEGIN");
    const result = await client.query(query, values);
    res.send(result.rows[0]);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    return next(err);
  } finally {
    client.release();
  }
});

router.get("/:id_playlist/videos", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select *
  from playswift.videos_playlists vp
  inner join playswift.videos v
  on vp.id_video = v.id_video
  where vp.id_playlist=$1`;
  const values = [req.params.id_playlist];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.post("/:id_playlist/videos", async (req, res, next) => {
  const { error } = validateVideo(req.body, req.params);
  if (error) {
    return next(createError(httpStatus.BAD_REQUEST, error.details[0].message));
  }
  const { id_playlist } = req.params;
  const { url_video, description, id_user } = req.body;

  const client = await pool.connect();
  const queryOwnership = `select * from playswift.playlists where id_user=$1 and id_playlist=$2`;
  const queryVideoPosition = `select max(position) from playswift.videos_playlists where id_playlist = $1`;
  const queryInsertVideo = `insert into playswift.videos values(default, $1, $2, $3) returning id_video, url_video`;
  const queryInsertVideoPlaylist = `insert into playswift.videos_playlists values(default, $1, $2, $3, $4, default, default)`;
  const queryExistingVideo = `select * from playswift.videos where url_video = $1`;

  try {
    await client.query("BEGIN");
    let values = [id_user, id_playlist];
    const ownership = await client.query(queryOwnership, values);
    if (ownership.rowCount <= 0) {
      return next(
        createError(
          httpStatus.FORBIDDEN,
          "You're not the owner of this playlist"
        )
      );
    }
    values = [url_video];
    const video = await client.query(queryExistingVideo, values);

    values = [id_playlist];
    let position = await client.query(queryVideoPosition, values);
    position = position.rows[0].max + 1;

    if (video.rowCount <= 0) {
      getYoutubeVideo(url_video, async resp => {
        const { title } = resp[0].snippet;
        const { url } = resp[0].snippet.thumbnails.high;
        values = [url_video, title, url];
        try {
          const video = (await client.query(queryInsertVideo, values)).rows[0];
          values = [id_playlist, video.id_video, description, position];
          await client.query(queryInsertVideoPlaylist, values);
          await client.query("COMMIT");
          res.send(video);
        } catch (err) {
          await client.query("ROLLBACK");
          return next(err);
        }
      });
    } else {
      values = [id_playlist, video.rows[0].id_video, description, position];
      await client.query(queryInsertVideoPlaylist, values);
      res.send(video);
      await client.query("COMMIT");
    }
  } catch (err) {
    await client.query("ROLLBACK");
    if (err.constraint) {
      return next(
        createError(
          httpStatus.BAD_REQUEST,
          "This playlist already contains this video"
        )
      );
    }
    return next(err);
  } finally {
    client.release();
  }
});

router.get("/:id_playlist/suggestions", async (req, res, next) => {
  const client = await pool.connect();
  const query = `select * from playswift.suggestions where id_playlist = $1 and state = 'pending'`;
  const values = [req.params.id_playlist];
  try {
    const result = await client.query(query, values);
    res.send(result.rows);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

router.post("/:id_playlist/suggestions", async (req, res, next) => {
  const { error } = validateSuggestion(req.body, req.params);
  if (error) {
    return next(createError(httpStatus.BAD_REQUEST, error.details[0].message));
  }

  const { id_playlist } = req.params;
  const { url_video, id_user } = req.body;

  const client = await pool.connect();
  const queryInsertSuggestion = `insert into playswift.suggestions values(default, $1, $2, 'pending', $3)`;
  const queryExistingVideo = `select id_video, url_video from playswift.videos where url_video = $1`;
  const queryInsertVideo = `insert into playswift.videos values(default, $1, $2, $3) returning id_video, url_video`;
  try {
    await client.query("BEGIN");
    let values = [url_video];
    const video = await client.query(queryExistingVideo, values);
    if (video.rowCount <= 0) {
      getYoutubeVideo(url_video, async resp => {
        const { title } = resp[0].snippet;
        const { url } = resp[0].snippet.thumbnails.high;
        values = [url_video, title, url];
        try {
          const video = await client.query(queryInsertVideo, values);
          values = [id_playlist, video.rows[0].id_video, id_user];
          const insertedSuggestion = await client.query(
            queryInsertSuggestion,
            values
          );
          res.send(insertedSuggestion.rows[0]);
          await client.query("COMMIT");
        } catch (err) {
          await client.query("ROLLBACK");
          if (err.constraint) {
            return next(
              createError(
                httpStatus.BAD_REQUEST,
                "You already suggested this video for this playlist"
              )
            );
          }
          return next(err);
        }
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
    return next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
