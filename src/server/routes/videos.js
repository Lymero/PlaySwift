const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

// TODO
router.get("/:id_video", async (req, res) => {
  const text = ``;
  const values = [];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send("not yet implemented");
  } catch (err) {
    logger.info(err.stack);
  }
});

// TODO
router.post("/:id_video", async (req, res) => {
  const text = ``;
  const values = [];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send("not yet implemented");
  } catch (err) {
    logger.info(err.stack);
  }
});

// TODO
router.delete("/:id_video", async (req, res) => {
  const text = ``;
  const values = [];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send("not yet implemented");
  } catch (err) {
    logger.info(err.stack);
  }
});

// TODO
router.get("/:id_video/reactions", async(req, res) => {
  const text = ``;
  const values = [];
  try {
    await db.connect();
    const result = await db.query(text, values);
    res.send("not yet implemented");
  } catch (err) {
    logger.info(err.stack);
  }
})

module.exports = router;
