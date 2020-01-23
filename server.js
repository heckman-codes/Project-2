/* eslint-disable prettier/prettier */

const path = require("path");
var express = require("express");
const session = require("express-session");

var exphbs = require("express-handlebars");
const sequelize = require("./config/config")

var db = require("./models")

var app = express();
var sess = {
  secret: "Session Secret Is Secret",
  cookie: {}
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
var PORT = process.env.PORT || 3005;

// Handlebars
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

// Routes

// ======= Unblock when ready to test! ===========
// require("./controllers")(app)
require("./routes/apiRoutes")(app); 
require("./routes/htmlRoutes")(app);

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
