const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
    user: String,
    date: String,

    wished: Array,
});

module.exports = mongoose.model("birthday", Schema);