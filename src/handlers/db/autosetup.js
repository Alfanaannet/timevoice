const mongoose = require("mongoose");

const auto = mongoose.Schema({
  guild: { type: String, required: true },
  autodash: { type: String, default: null },
  autovoice: { type: String, default: null },
  autocategory: { type: String, default: null },
  ChannelCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("autosetup", auto);
