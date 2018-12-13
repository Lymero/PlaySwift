const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const sassMiddleware = require("node-sass-middleware");
const morgan = require("morgan");
const fs = require("fs");
const error = require("./middlewares/error");
const assetPath = require("./utils/asset_path");
const routes = require("./routes/routes");
const { logs, env } = require("./config/vars");
const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");

const serverRoot = path.join(__dirname, ".");
const app = express();

app.locals.assetPath = assetPath;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

if (env === "production") {
  app.use(
    morgan(logs, {
      stream: fs.createWriteStream(path.join(__dirname, "./logs/access.log"), {
        flags: "a"
      })
    })
  );
} else {
  app.use(morgan(logs));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(serverRoot, "public"),
    dest: path.join(serverRoot, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
  })
);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "../../dist")));

app.use("/", indexRouter);
app.use("/authCallback", authRouter);

app.use("/api", routes);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler
app.use(error.handler);

module.exports = app;
