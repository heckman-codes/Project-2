const router = require("express").Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { secret } = require("../config/keys");

router.get("/signup", (req, res) => {
    res.render("signup", {}); 
});

router.post("/signup", (req, res) => {
    User.findOne({ where: { userEmail: req.body.userEmail } }).then(user => {
        console.log(user);
        if (user) {
            let error = "userEmail exists in database.";
            return res.status(400).json(error);
        } else {
            const newUser = new User({
                userEmail: req.body.userEmail,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            const payload = {
                                id: user.id,
                                userEmail: user.userEmail
                            };
                            req.session.userId = payload.id;
                            req.session.userEmail = payload.userEmail;
                            res.send(200);
                        });
                })
            });
        }
    });
});


router.get("/login", (req, res) => {
    res.render("login", {});
});

router.post("/account", (req, res) => {
    const userEmail = req.body.userEmail;
    const password = req.body.password;
    User.findOne({ where: { userEmail } }).then(user => {
        if (!user) {
            errors.userEmail = "No Account Found";
            return res.status(404).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                console.log("in")
                const payload = {
                    id: user.id,
                    userEmail: user.userEmail
                };
                req.session.userId = payload.id;
                req.session.userEmail = payload.userEmail;
                res.status(200).json(payload.id);
            } else {
                let errors = {};
                errors.password = "Password is incorrect";
                res.status(500).json(errors);
            }
        });
    });
});

router.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.status(204).send("User has been logged out");
    } else {
        res.status(404).send("User not signed in");
    }
});

router.delete("/user/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;