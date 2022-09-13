const mongoose = require("mongoose");
let Schema = new mongoose.Schema({
  Partner: String,
  Children: Array,
  Siblings: Array,
  Parents: Array,
  User: String,
  Guild: String,
});

module.exports = mongoose.model("family", Schema);