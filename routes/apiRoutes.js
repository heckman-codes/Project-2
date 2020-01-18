var db = require("../models");
const petfinder = require("@petfinder/petfinder-js");

// const client = new petfinder.Client({
//   apiKey: "EleUQUs9t8vtF8lIm7K3whOXqDumhTIw2Wo9r4uwxWFTnXP1VQ",
//   secret: "1f7G1WupvYNO51Jf5vyueYCqvyOb3LjzoP7voWXs"
// });

module.exports = function(app) {
  // Get all examples
  // app.get("/api/examples", function (req, res) {
  //   db.Example.findAll({}).then(function (dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};

// client.animal
//   .search({ location: 95811, type: "dog", status: "adoptable", distance: 25 })
//   .then(resp => {
//     console.log(resp.data.animals[0]);
//   });
