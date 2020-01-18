// REQUIRED
// for keys/id/secrets
require("dotenv").config();
let keys = require("../config/keys");
var db = require("../models");
const petfinder = require("@petfinder/petfinder-js");

const client = new petfinder.Client(keys.petfinderClient);

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Example.findAll({}).then(function (dbExamples) {
    res.render("index", {});
    // });
  });

  // });

  // Load example page and pass in an example by id
  app.get("/adopt", function(req, res) {
    client.animal
      .search({
        location: 95811,
        type: "dog",
        status: "adoptable",
        distance: 25
      })
      .then(resp => {
        console.log(resp.data.animals);
        res.render("pets", {
          pet: resp.data.animals[Math.floor(Math.random() * 10)]
        });
        // res.json(resp.data.animals[0].photos[0].large);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get("/post", function(req, res) {
    res.render("post", {});
  });

  app.get("/account", function(req, res) {
    res.render("account", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
