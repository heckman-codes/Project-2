// REQUIRED

// for keys/id/secrets
require("dotenv").config();
let keys = require("../config/keys");
var db = require("../models");
let petfinder = require("@petfinder/petfinder-js");

let client = new petfinder.Client({
  apiKey: keys.id,
  secret: keys.secret
});

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // db.Example.findAll({}).then(function (dbExamples) {
    res.render("index", {});
    // });
  });

  app.get("/adopt/:animal/:location/:distance", function (req, res) {
    client.animal
      .search({
        location: req.params.location,
        type: req.params.animal,
        status: "adoptable",
        distance: req.params.distance
      })
      .then(resp => {
        console.log(resp.data.animals);
        var randomNum = Math.floor(Math.random() * 10);
        res.render("pets", {
          pet: resp.data.animals[randomNum],
          petDesc: resp.data.animals[randomNum].description
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get("/post", function (req, res) {
    res.render("post", {});
  });

  app.get("/signup", function (req, res) {
    res.render("signup", {});
  });

  app.get("/account", function (req, res) {
    res.render("account", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};