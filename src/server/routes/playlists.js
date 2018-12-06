const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.get("/", async (req, res) => {
  try {
    await db.connect();
    const result = await db.query("select * from playswift.playlists");
    res.send(result.rows);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.post("/", async (req, res) => {
  const text =
    "insert into playswift.playlists values(default, $1, $2, $3, $4, default, default, $5, default, default) returning id_playlist,name,id_tag,visible,id_user,creation_date,last_update_date,description,likes_number,dislikes_number";

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

router.put("/:id", async function(req, res) {
  const text =
    "update playswift.playlists set name=$1, visible=$2, description=$3 where id_playlist=$4 returning id_playlist,name,id_tag,visible,id_user,creation_date,last_update_date,description,likes_number,dislikes_number";

  const values = [
    req.body.name,
    req.body.visible,
    req.body.description,
    req.params.id
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
