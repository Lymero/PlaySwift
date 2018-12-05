const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.get("/", async (req, res, next) => {
  try {
    await db.connect();
    const result = await db.query("select * from playswift.playlists");
    res.send(result);
  } catch (err) {
    logger.info(err.stack);
  }
});
//git merge fdp va
module.exports = router;
