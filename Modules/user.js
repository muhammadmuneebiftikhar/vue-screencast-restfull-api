const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    _id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    admin: {
        type: Boolean,
    }
})

module.exports = mongoose.model("user", videoSchema);