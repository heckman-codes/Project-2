var db = require("../models");
const petfinder = require("@petfinder/petfinder-js");
let keys = require("../config/keys");

let client = new petfinder.Client({
  apiKey: keys.id,
  secret: keys.secret
});

module.exports = function (app) {

  // Create a new example
  app.get("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/adopt/:animal/:location/:distance/:petnum", function (req, res) {
    console.log(req.params);
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
        res.json({
          pet: petArr[0][req.params.petnum || 0],
          petDesc: petArr[0][req.params.petnum || 0].description,
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
