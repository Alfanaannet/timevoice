require("dotenv").config();

module.exports = {
  token: process.env.DISCORD_TOKEN || "", // <==== PASTE YOU TOKEN
  prefix: process.env.PREFIX || "!!", // <==== SET YOU PRERIX BOT [ OWNER COMMANDS ]
  owner: process.env.OWNER || "775012312876711936", // <==== BOTS OWNER ID
};