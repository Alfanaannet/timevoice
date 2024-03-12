const mongoose = require("mongoose");

const temp = mongoose.Schema({
  guid: { type: String, required: true },
  id: { type: String, default: null },
  room: { type: String, default: null },
});

module.exports = mongoose.model("tempvoice", temp);