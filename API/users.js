require('dotenv').config();
const express = require("express");
const { schema, updateOne } = require("../Modules/user");
const router = express.Router();
const User = require("../Modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/users",async (req, res) => {
    try
    {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const token = jwt.sign({
            _id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            admin: req.body.admin,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "365d"
        },
        )
        const user = new User({
            _id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            admin: req.body.admin,
            played_video_ids: req.body.played_video_ids,
            token: token,
        });
        console.log(req.body);
        user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                _id: result._id,
                name: result.name,
                email: result.email,
                admin: result.admin,
                played_video_ids: result.played_video_ids,
            });
        })
    }
    catch{
        console.log(err)
        res.status(500).send(err)
    }
});

router.get("/users", async (req, res) => {
    await User.find()
    .exec()
    .then(results => {
        res.status(200).json({
            count: results.length,
            users: results.map((result) => {
                return {
                    _id: result._id,
                    type: "user",
                    attributes: {
                        _id: result._id,
                        name: result.name,
                        email: result.email,
                        admin: result.admin,
                        played_video_ids: result.played_video_ids,
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.get("/users/:id", (req, res) => {
    User.findById(req.params.id)
    .exec()
    .then(result => {
        if(!result) {
            return res.status(404).json({
              message: "ID not found"
            })
          }
        res.status(200).json({
            _id: result._id,
            type: "user",
            attributes: {
                _id: result._id,
                name: result.name,
                email: result.email,
                admin: result.admin,
                played_video_ids: result.played_video_ids,
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.put("/users/:id", (req, res, next) => {
    const id = req.params.id;
    const updateOps = req.body;
    User.updateOne({ _id: id }, { $push: updateOps })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "User Updated"
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });  
      });
})

module.exports = router;