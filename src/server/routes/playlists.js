const express = require("express");
const router = express.Router();
const db = require("../modules/db");

router.get("/", (req, res, next) => {
  res.json([{ playlist: "hello world" }, { playlist: "playlist 2" }]);
});

module.exports = router;
