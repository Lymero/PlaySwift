const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.get("/", async (req, res) => {
  try {
    await db.connect();
    const result = await db.query(
      `select * from playswift.playlists where visible=true`
    );
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
