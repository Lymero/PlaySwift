const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { pool } = require("../modules/db");
const { validateReaction } = require("../models/reaction");

router.put("/:id_reaction", async (req, res) => {
  const { error } = validateReaction(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const client = await pool.connect();
  const query = `update playswift.reactions 
        set vote = $1, comment = $2 
        where id_reaction = $3 and id_user = $4
        returning id_reaction, id_video_playlist, vote, comment, reaction_date, id_user`;
  const values = [
    req.body.vote,
    req.body.comment,
    req.params.id_reaction,
    req.body.id_user
  ];
  try {
    const result = await client.query(query, values);
    console.log(result);
    res.send(result.rows[0]);
  } catch (err) {
    logger.info(err.stack);
  } finally {
    client.release();
  }
});

module.exports = router;
