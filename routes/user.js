const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

//create user (requires auth from currently existing user)
router.post("/signup", checkAuth, (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(409).json({ message: "User already exsist" });
    }
  });
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash,
    })
      .save()
      .then((user) => {
        console.log(user);
        res.status(201).json({ message: "User added" });
      });
  });
});
//login
router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth succesful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete user by id
router.delete("/:userId", checkAuth, (req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
