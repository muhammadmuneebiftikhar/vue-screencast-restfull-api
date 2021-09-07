const express = require("express");
const router = express.Router();
const User = require("../Modules/user");
const bcrypt = require("bcrypt");

router.post("/sessions", async (req, res) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            console.log(user)
            if(user == null) {
                return res.status(400).send('Cannot find user');
            }
            try{
                console.log("I'm working fine");
                if(bcrypt.compare(req.body.password, user.password)){
                    res.status(201).json({user});
                }
            } catch {
                res.status(500).send({
                    message: "Error"
                })
              }
        })
        .catch((err) => {
        res.status(401).json({
            error: err
        })
    });
})


module.exports = router;
