const express = require("express");
const router = express.Router();
const logger = require("../modules/logger").logger;
const { db } = require("../modules/db");

router.delete("/:id_suggestion", async (req, res) => {
  const query = `delete from playswift.suggestions where id_suggestion = $1`;
  const values = [req.params.id_suggestion];
  try {
    await db.connect();
		const result = await db.query(query, values);
    res.send(result.rows[0]);
  } catch (err) {
    logger.info(err.stack);
  }
});

module.exports = router;
