const express = require("express");
const { schema } = require("../Modules/user");
const router = express.Router();
const User = require("../Modules/user");
const bcrypt = require("bcrypt");

router.post("/users", async (req, res) => {
    try
    {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            _id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            admin: req.body.admin,
        });
        user.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                _id: result._id,
                name: result.name,
                email: result.email,
                password: result.password,
                admin: result.admin,
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
})

module.exports = router;