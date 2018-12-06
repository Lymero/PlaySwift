const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.get("/:id_playlist", async (req, res) => {
  const text = `select vp.id_playlist,v.id_video,v.url_video,v.video_length,v.title,v.url_thumbnail
  from playswift.videos_playlists vp,playswift.videos v
  where vp.id_video=v.id_video and id_playlist=$1`;
  const values = [req.params.id_playlist];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send(result.rows);
    logger.info("SELECT" + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.post("/", async (req, res) => {
  try {
    await db.connect();
    let text = `select count(id_video) 
    from playswift.videos 
    where url_video=$1`;
    let values = [req.body.url_video];
    let result = await db.query(text, values);
    if (result.rows[0].count == 0) {
      text = `insert into playswift.videos
        values(default,$1,$2,$3)`;
      values = [req.body.url_video, req.body.title, req.body.url_thumbnail];
    }

    res.send(result);
    logger.info("INSERT:" + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

module.exports = router;
