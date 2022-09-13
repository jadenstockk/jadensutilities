const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  Money: Number,
  Job: String,
  User: String,
  Guild: String,
});

module.exports = mongoose.model("money", Schema);
