const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.put("/:id", async function(req, res) {
  const text = `update playswift.playlists
    set name=$1, visible=$2, description=$3
    where id_playlist=$4
    returning id_playlist,name,id_tag,visible,id_user,creation_date,last_update_date,description,likes_number,dislikes_number`;
  const values = [
    req.body.name,
    req.body.visible,
    req.body.description,
    //Date.now(),
    req.params.id
  ];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send(result.rows[0]);
    logger.info("UPDATE:" + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

router.delete("/:id", async function(req, res) {
  const text = `delete from playswift.playlists where id_playlist=$1`;
  const values = [req.params.id];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send(result);
    logger.info("DELETE:" + values);
  } catch (err) {
    logger.info(err.stack);
  }
});

module.exports = router;
