const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.put("/:id_reaction", async (req, res) => {
  const query = `update playswift.reactions 
        set vote = $1, comment = $2 
        where id_suggestion = $3`;
  const values = [req.body.vote, req.body.comment, req.params.id_suggestion];
  try {
    await db.connect();
    const result = await db.query(query, values);
    res.send(result.rows[0]);
  } catch (err) {
    logger.info(err.stack);
  }
});

module.exports = router;
