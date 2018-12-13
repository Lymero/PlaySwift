const express = require("express");
const router = express.Router();
const httpStatus = require("http-status");
const createError = require("http-errors");
const { pool } = require("../modules/db");

router.put("/:id_suggestion", async (req, res, next) => {
  const client = await pool.connect();
  const queryOwnership = `
  select
    *
  from
    playswift.playlists pl,
    playswift.suggestions su
  where
    pl.id_playlist = su.id_playlist
    and pl.id_user = $1`;
  const valuesOwnership = [req.body.id_user];
  const updateSuggestion = `
  update
    playswift.suggestions
  set
      state = $2
  where
    id_suggestion = $1`;
  const valuesSuggestion = [req.params.id_suggestion, req.body.state];
  try {
    const ownership = await client.query(queryOwnership, valuesOwnership);
    if (ownership.rowCount <= 0) {
      return next(
        createError(
          httpStatus.FORBIDDEN,
          "Forbidden update - Not the owner of the playlist"
        )
      );
    }
    const updatedSuggestion = await client.query(
      updateSuggestion,
      valuesSuggestion
    );
    res.send(updatedSuggestion.rows);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
