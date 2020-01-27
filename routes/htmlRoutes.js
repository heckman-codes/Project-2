// REQUIRED

// for keys/id/secrets
require("dotenv").config();
let render = require("express-handlebars")
let keys = require("../config/keys");
var db = require("../models");
let petfinder = require("@petfinder/petfinder-js");
let user = require("./apiRoutes")
let Cookies = require("js-cookie")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let client = new petfinder.Client({
  apiKey: keys.id,
  secret: keys.secret
});

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // db.Example.findAll({}).then(function (dbExamples) {
    res.render("index", {
      userLoggedIn: req.user
    });
    // });
  });

  app.get("/adopt/:animal/:location/:distance/:petnum", function (req, res) {
    client.animal
      .search({
        location: req.params.location,
        type: req.params.animal,
        status: "adoptable",
        distance: req.params.distance,
        limit: 100
      })
      .then(resp => {
        var petArr = [];
        function createPetArray() {
          petArr.push(resp.data.animals);
          console.log("PET ARRAY BELOW")
          // console.log(petArr);
        }

        createPetArray();

        // console.log(resp.data.animals);
        // var randomNum = Math.floor(Math.random() * petArr[0].length);
        res.render("pets", {
          pet: petArr[0][req.params.petnum || 0],
          petDesc: petArr[0][req.params.petnum || 0].description,
          petnum: req.params.petnum || 0
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

    // var decoded = Cookies.get();
    // console.log("Decoded Val: " + decoded);

    if (req.user) {
      db.SavedPets.findAll({
        where: {
          UserId: 5
        }
      }).then(function (result) {
        // res.json(SavedPets);
        // console.log(result.toJSON());
        res.render("account", {
          userLoggedIn: req.user,
          SavedPets: result
        });
      });
    } else {
      res.render("account", {
        userLoggedIn: req.user,
      });
    }

  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
