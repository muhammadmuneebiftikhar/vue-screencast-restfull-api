const express = require("express");
const user = require("../Modules/user");
const router = express.Router();
const User = require("../Modules/user");

router.post("/sessions", async (req, res) => {
    User.findOne({email: req.body.email, password: req.body.password})
        .exec()
        .then(user => {
                 res.status(201).json({
                     user
             })
    })
        .catch((err) => {
        res.status(401).json({
            error: err
        })
    });
    
})


module.exports = router;
