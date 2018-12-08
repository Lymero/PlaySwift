const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");
const { getYoutubeVideo } = require("../modules/google/youtube");

router.get("/", async (req, res) => {
  try {
    await db.connect();
    const result = await db.query(
      `select * from playswift.playlists where visible=true`
    );
    //console.log(result.rows);
    res.send(result.rows);
    logger.info("SELECT:playlists");
  } catch (err) {
    logger.info(err.stack);
  }
});

router.post("/", async (req, res) => {
  const text = `insert into playswift.playlists
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
    await db.connect();
    const result = await db.query(text, values);
    res.send(result.rows[0]);
    logger.info("INSERT:" + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.put("/:id_playlist", async (req, res) => {
  const query = `update playswift.playlists
    set name=$1, visible=$2, description=$3
    where id_playlist=$4
    returning id_playlist,name,id_tag,visible,id_user,creation_date,last_update_date,description,likes_number,dislikes_number`;
  const values = [req.body.name, req.body.visible, req.body.description, req.params.id_playlist];
  try {
    await db.connect();
    const result = await db.query(query, values);
    res.send(result.rows[0]);
    logger.info("UPDATE:" + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.delete("/:id_playlist", async (req, res) => {
  const query = `delete from playswift.playlists where id_playlist=$1`;
  const values = [req.params.id_playlist];
  try {
    await db.connect();
    const result = await db.query(query, values);
    res.send(result);
    logger.info("DELETE:" + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.get("/:id_playlist/videos", async (req, res) => {
  const query = `select vp.id_playlist,v.id_video,v.url_video,v.video_length,v.title,v.url_thumbnail
  from playswift.videos_playlists vp,playswift.videos v
  where vp.id_video=v.id_video and id_playlist=$1`;
  const values = [req.params.id_playlist];
  try {
    await db.connect();
    const result = await db.query(query, values);
    res.send(result.rows);
    logger.info("SELECT " + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.post("/:id_playlist/videos", async (req, res) => {
  try {
    await db.connect();
    // verify video is already registered
    let query = `select count(id_video) 
    from playswift.videos 
    where url_video=$1`;
    const { url_video } = req.body;
    let values = [url_video];
    let result = await db.query(query, values);

    query = `select max(position)
    from playswift.videos_playlists
    where id_playlist=$1`;
    values = [req.params.id_playlist];
    const position = (await db.query(query, values)).rows[0].max + 1;

    // if it doesn't, add it to db
    if (result.rows[0].count == 0) {
      query = `insert into playswift.videos
      values(default, $1, 0, $2, $3)
      returning id_video_playlist, url_video`;
      getYoutubeVideo(req.body.url_video, async resp => {
        const { title } = resp[0].snippet;
        const { url } = resp[0].snippet.thumbnails.high;
        values = [url_video, title, url];
        const new_video = (await db.query(query, values)).rows[0];
        const _id_video = new_video.id_video;
        logger.info("INSERT:" + values);

        query = `insert into playswift.videos_playlists
        values(default, $1, $2, $3, $4)`;
        values = [
          req.params.id_playlist,
          _id_video,
          req.body.description,
          position
        ];
        db.query(query, values);
        res.send(new_video);
      });
    } else {
      // else we can directly create the videos_playlists entity
      query = `select id_video, url_video from playswift.videos where url_video=$1`;
      values = [url_video];
      const new_video = (await db.query(query, values)).rows[0];
      const _id_video = new_video.id_video;

      query = `insert into playswift.videos_playlists
      values(default, $1, $2, $3, $4)`;
      values = [
        req.params.id_playlist,
        _id_video,
        req.body.description,
        position
      ];
      db.query(query, values);
      res.send(new_video);
    }
  } catch (err) {
    res.status(400);
    logger.info(err.stack);
  }
});
 
router.get("/:id_playlist/suggestions", async (req, res) => {
  const query = `select * from playswift.suggestions where id_playlist = $1 and state = 'pending'`;
  const values = [req.params.id_playlist];
  try {
    await db.connect();
    const result = await db.query(query, values);
    res.send(result.rows[0]);
  } catch (err) {
    logger.info(err.stack);
  }
});

// TODO
router.post("/:id_playlist/suggestions", async (req, res) => {
  const text = `insert into playswift.suggestions values(default, $1, $2, 'pending', $3)`;
  const values = [req.body.id_user];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send(result.rows[0]);
  } catch (err) {
    logger.info(err.stack);
  }
});

module.exports = router;
