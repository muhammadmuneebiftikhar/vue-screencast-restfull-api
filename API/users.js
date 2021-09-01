const express = require("express");
const { schema } = require("../Modules/user");
const router = express.Router();
const User = require("../Modules/user");

router.post("/users", (req, res) => {
    console.log('here')
    const user = new User({
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
   user.save()
    .then(result => {
            console.log(result);
            res.status(201).json({
                _id: result._id,
                name: result.name,
                email: result.email,
                password: result.password,
            });
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    });
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

// router.get("/videos/:id", (req, res) => {
//     Video.findById(req.params.id)
//     .exec()
//     .then(result => {
//         console.log(result);
//         if(!result) {
//             return res.status(404).json({
//               message: "ID not found"
//             })
//           }
//         res.status(200).json({
//             _id: result._id,
//             name: result.name,
//             description: result.description,
//             thumbnail: result.thumbnail,
//             videoUrl: result.videoUrl
//         });
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         })
//     });
// });

// router.delete("/videos/:id", async (req, res) => {
//     Video.remove({_id :req.params.id})
//     .exec()
//     .then(() => {
//         res.status(200).json({
//             message: "Video Deleted"
//         })
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         })
//     });
// });

// router.put("/videos/:id", (req, res, next) => {
//     const id = req.params.id;
//     const updateOps = req.body;
//     Video.updateOne({ _id: id }, { $set: updateOps })
//       .exec()
//       .then((result) => {
//         res.status(200).json({
//           message: "Video Updated",
//           request: {
//             type: "GET",
//             url: "http://localhost:3000/api/videos/" + id,
//           },
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({ error: err });
//       });
// })


module.exports = router;