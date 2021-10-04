require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../Modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/sessions", async (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
              admin: user.admin,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1h",
            }
          );
          user.token = token;
          return res.status(200).json({
            user,
          });
        }
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: err,
      });
    });
});

module.exports = router;
