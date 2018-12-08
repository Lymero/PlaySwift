let express = require("express");
let router = express.Router();

let jsonwebtoken = require("jsonwebtoken");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("authCallback", { jsonwebtoken: jsonwebtoken });
});

module.exports = router;
