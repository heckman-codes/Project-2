// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const path = require("path");
var express = require("express");
var exphbs = require("express-handlebars");
const sequelize = require("./config/config")

var db = require("./models")

var app = express();

const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3005;

// Requiring our models for syncing
var db = require('./models');

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

// Static directory
app.use(express.static('public'));

app.use((req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    const { id } = jwt.verify(token, process.env.APP_SECRET);

    req.user = id;
  }

  next();
});

// Routes
// =============================================================
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;