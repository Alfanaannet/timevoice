const mongoose = require("mongoose");

const bottom = mongoose.Schema({
  guild: { type: String, required: true },
  lockchannel: { type: Boolean, default: true },
  hidechannel: { type: Boolean, default: true },
  mute: { type: Boolean, default: true },
  customizeusers: { type: Boolean, default: true },
  disconnect: { type: Boolean, default: true },
  usersmanager: { type: Boolean, default: true },
  deletechannel: { type: Boolean, default: true },
  renamechannel: { type: Boolean, default: true },
});

module.exports = mongoose.model("bottom", bottom);