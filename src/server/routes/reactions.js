const express = require("express");
const router = express.Router();
const { pool } = require("../modules/db");
const { validateReaction } = require("../models/reaction");
const httpStatus = require("http-status");
const createError = require("http-errors");

router.put("/:id_reaction", async (req, res, next) => {
  const { error } = validateReaction(req.body, req.params);
  if (error) {
    return next(createError(httpStatus.BAD_REQUEST, error.details[0].message));
  }
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
    res.send(result.rows[0]);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
