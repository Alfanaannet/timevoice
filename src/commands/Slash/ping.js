const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('See The Bots Ping In Ms'),
  run: async (client, interaction) => {
    const ping = Math.floor(Math.random() * client.ws.ping);
    var pingSeconds = ((ping % 60000) / 1000);
    var apiSeconds = ((client.ws.ping % 60000) / 1000);
    const Started = new EmbedBuilder()
      .setAuthor({
        name: `Network Ping!`,
        iconURL: "https://cdn.discordapp.com/emojis/984188836013826048.gif",
      })
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`**Check Out How Fast Our Bot Is**`)
      .addFields([
        {
          name: "🤖┆Bot latency",
          value: `${ping}ms (${pingSeconds}s)`,
          inline: true,
        },
        {
          name: "💻┆API Latency",
          value: `${client.ws.ping}ms (${apiSeconds}s)`,
          inline: true,
        },
      ])
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    interaction.reply({ embeds: [Started] })
  }
};