const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const {
  db
} = require("../modules/db");
// TODO change "1" in :idPlaylist
router.get("/:idPlaylist", async (req, res) => {
  try {
    await db.connect();
    const result = await db.query(
      `select vp.id_video_playlist, vp.id_playlist, vp.id_video, vp.description, vp.position, v.id_video, v.url_video, v.video_length, v.title, v.url_thumbnail
      from playswift.videos_playlists vp
      inner join playswift.videos v
      on vp.id_video = v.id_video
      where vp.id_playlist = 1`
    );
    //console.log(result.rows);
    res.send(result.rows);
    logger.info("SELECT:videos and videos_playlists");
  } catch (err) {
    logger.info(err.stack);
  }
});

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

module.exports = router;