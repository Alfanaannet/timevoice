const { Client, Collection, IntentsBitField, Partials } = require("discord.js");
const { Poru } = require("poru");
const { ClusterClient } = require("discord-hybrid-sharding");

class MainClient extends Client {
  constructor() {
    super({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.MessageContent
      ]
    });
    this.poru = new Poru(this, {
      send: (guildId, payload) => {
        const guild = this.guilds.cache.get(guildId);
        if (guild) guild.shard.send(payload);
      },
    });

    this.commands = new Collection();
    this.aliases = new Collection();
    this.slashCommands = new Collection();

    ["AntiCrash", "Events", "Database", "Slash"].forEach((handler) => {
      require(`./handlers/${handler}`)(this);
    });

    this.cluster = new ClusterClient(this);
  }
  connect() {
    return super.login(this.token);
  }
}

module.exports = MainClient;