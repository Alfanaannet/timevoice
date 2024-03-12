const mongoose = require("mongoose");

const settings = mongoose.Schema({
  guild: { type: String, required: true },
  room: { type: String, default: null },
  room1: { type: String, default: null },
  room2: { type: String, default: null },
  room3: { type: String, default: null },
  room4: { type: String, default: null },
  name: { type: String, default: null },
  dashboard: { type: String, default: null },
  ChannelCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("settings", settings);
