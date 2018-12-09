const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const indexRouter = require("./index");
const playlistsRouter = require("./playlists");
const reactionsRouter = require("./reactions");
const suggestionsRouter = require("./suggestions");
const tagsRouter = require("./tags");
const usersRouter = require("./users");
const videosRouter = require("./videos");

const auth = require("../middlewares/auth");

// API status
router.get("/status", (req, res) => res.send("OK"));

// Doesn't need authentication
router.use("/", indexRouter);
router.use("/authCallback", authRouter);

// Authentication needed
router.use(auth.checkJwt);
router.use(auth.currentUser);

// Authenticated routes
router.use("/playlists", playlistsRouter);
router.use("/reactions", reactionsRouter);
router.use("/suggestions", suggestionsRouter);
router.use("/tags", tagsRouter);
router.use("/users", usersRouter);
router.use("/videos", videosRouter);

module.exports = router;
