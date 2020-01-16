/* eslint-disable prettier/prettier */
var db = require("../models");
const petfinder = require("@petfinder/petfinder-js");

const client = new petfinder.Client({
  apiKey: "EleUQUs9t8vtF8lIm7K3whOXqDumhTIw2Wo9r4uwxWFTnXP1VQ",
  secret: "1f7G1WupvYNO51Jf5vyueYCqvyOb3LjzoP7voWXs"
});

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
    client.animal.search({ location: 95811, type: "dog", status: "adoptable", distance: 25 })
      .then(resp => {
        console.log(resp.data.animals[0]);
        res.render("pets", { pet: resp.data.animals[0] });
        // res.json(resp.data.animals[0].photos[0].large);
      });
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
