const express = require("express");
const { schema } = require("../Modules/video");
const router = express.Router();
const Video = require("../Modules/video");
const checkAuth = require("../Middleware/checkAuth");

router.post("/videos", (req, res) => {
    const video = new Video({
        _id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        thumbnail: req.body.thumbnail,
        videoUrl: req.body.videoUrl,
    });
   video.save()
    .then(result => {
            res.status(201).json({
                _id: result._id,
                name: result.name,
                description: result.description,
                thumbnail: result.thumbnail,
                videoUrl: result.videoUrl,
            });
    })
    .catch(err => {
        res.status(500).send(err)
    });
});

router.get("/videos", async (req, res) => {
    await Video.find()
    .exec()
    .then(results => {
        res.status(200).json({
            count: results.length,
            videos: results.map((result) => {
                return {
                    _id: result._id,
                    name: result.name,
                    description: result.description,
                    thumbnail: result.thumbnail,
                    videoUrl: result.videoUrl,
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

router.get("/videos/:id", (req, res) => {
    Video.findById(req.params.id)
    .exec()
    .then(result => {
        console.log(result);
        if(!result) {
            return res.status(404).json({
              message: "ID not found"
            })
          }
        res.status(200).json({
            _id: result._id,
            name: result.name,
            description: result.description,
            thumbnail: result.thumbnail,
            videoUrl: result.videoUrl
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.delete("/videos/:id", async (req, res) => {
    Video.deleteOne({_id :req.params.id})
    .exec()
    .then(() => {
        res.status(200).json({
            message: "Video Deleted"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.put("/videos/:id", (req, res, next) => {
    const id = req.params.id;
    const updateOps = req.body;
    Video.updateOne({ _id: id }, { $set: updateOps })
      .exec()
      .then((result) => {
          console.log(result);
        res.status(200).json({
          message: "Video Updated",
          request: {
            type: "GET",
            url: "http://localhost:3000/api/videos/" + id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
})


module.exports = router;