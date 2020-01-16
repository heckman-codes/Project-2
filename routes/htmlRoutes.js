/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: JSON.parse(JSON.stringify(dbExamples))
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/adopt", function (req, res) {
    res.render("pets", {});
  });

  app.get("/post", function (req, res) {
    res.render("post", {});
  });

  app.get("/account", function (req, res) {
    res.render("account", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
