const mongoose = require("mongoose");

const channelcount = mongoose.Schema({
  guild: { type: String, required: true },
  ChannelCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("channelcount", channelcount);
