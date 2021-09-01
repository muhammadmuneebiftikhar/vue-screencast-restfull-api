const express = require("express");
const user = require("../Modules/user");
const router = express.Router();
const User = require("../Modules/user");

router.post("/sessions", async (req, res) => {
    User.find({email: req.body.email, password: req.body.password})
        .exec()
        .then(user => {
            if(user.length >= 1) {
                return res.status(409).json({user});
            };
        })
        .catch((err) => {
        res.status(401).json({
            error: err
        })
    });
    
})


module.exports = router;


// await User.find(req.body.email)
//     .exec()
//     .then(result => {
//         console.log(result);
//         if(!result) {
//             return res.status(404).json({
//               message: "Email not found"
//             })
//           }
//         res.status(200).json({
//             _id: result._id,
//             name: result.name,
//         });
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         })
//     });