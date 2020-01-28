var db = require("../models");
const petfinder = require("@petfinder/petfinder-js");
let keys = require("../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  app.post("/api/postpet", function (req, res) {
    console.log(req.body)
    console.log(req.user)
    const pet = Object.assign({}, req.body)
    pet.UserId = req.user;
    db.SavedPets.create(pet).then(function (SavedPetResult) {
      res.json(SavedPetResult);
    })
  })

  app.delete("/api/remove/pet/:id", function (req, res) {
    console.log(req.body)
    db.SavedPets.destroy({
      where: req.body
    }
    ).then(function (removedPet) {
      res.json(removedPet);
    })
  })

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
          console.log("PET ARRAY BELOW");
          // console.log(petArr);
        }

        createPetArray();

        // console.log(resp.data.animals);
        // var randomNum = Math.floor(Math.random() * petArr[0].length);
        res.json({
          pet: petArr[0][req.params.petnum || 0],
          petDesc: petArr[0][req.params.petnum || 0].description
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
  // creating a new user
  app.post("/api/user/usercreate", async function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email.toLowerCase();
    const password = await bcrypt.hash(req.body.password, 10);

    // create user in database
    const user = await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });

    console.log(user);

    // create cookie and token
    const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    res.json(user);
  });

  // user is logged in
  app.get("api/user", function (req, res) {
    res.json(req.user);

    db.account({ where: (id = user) });
  });

  app.post("/api/user/login", async function (req, res) {
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      res.json("NO USER FOUND WITH THAT EMAIL");
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    console.log("Is User Valid ", valid);

    if (!valid) {
      res.json("INCORRECT PASSWORD ENTERED");
    }

    // create cookie and token
    const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    res.json(user);
  });

  // logging out user
  app.get("/api/user/logout", function (req, res) {
    res.clearCookie("token");
    res.json("LOGGED OUT USER");
  });

};
