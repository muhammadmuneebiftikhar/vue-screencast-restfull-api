const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
    token: {
        type: String,
    },
    played_video_ids: {
        type: Array,
    },
})

module.exports = mongoose.model("user", videoSchema);