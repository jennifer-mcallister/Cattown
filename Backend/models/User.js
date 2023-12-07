const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        unique: true,
        required: true,
    },
    savefile: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "Savefile"
    }
});

module.exports = mongoose.model("User", UserSchema, "users");