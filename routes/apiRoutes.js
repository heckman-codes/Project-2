var db = require("../models");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


module.exports = function(app) {

  // creating a new user
  app.post("/api/user/signup", async function(req, res){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email.toLowerCase();
    const password = await bcrypt.hash(req.body.password, 10)

    // create user in database
    const user = await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }).then(function(data){})

    // create cookie and token
    const token = jwt.sign({ id:user.id }, process.env.APP_SECRET)
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })

    res.json(user)
  })

  // user is logged in
  app.get("api/user", function (req, res) {
    res.json(req.user)

    db.account({ where: id = user })
  })

  app.post("/api/user/login", async function(req, res){
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    })

      if(!user) {
        res.json("NO USER FOUND WITH THAT EMAIL")
      }

      const valid = await bcrypt.compare(req.body.password, user.password)
      console.log("Is User Valid ", valid)

      if(!valid) {
        res.json("INCORRECT PASSWORD ENTERED")
      }

      // create cookie and token
      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET)
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      })

      res.json(user)
  })

  // logging out user
  app.get("/api/user/logout", function(req, res) {
    res.clearCookie("token")
    res.json("LOGGED OUT USER")
  })

};
