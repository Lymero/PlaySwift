const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.get("/", async res => {
  try {
    await db.connect();
    const result = await db.query("select * from playswift.playlists");
    res.send(result);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.post("/", async (req, res) => {
  const text =
    "insert into playswift.playlists values(default, $1, $2, $3, $4, default, default, $5, default, default) returning id_playlist,name,id_tag,visibile,id_user,creation_date,last_update_date,description,likes_number,dislikes_number";

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
    logger.info(text + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

module.exports = router;
