const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const os = require("os");
const config = require("../../config/config.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('Restart The System.'),
  run: async (client, interaction) => {
    const Owner = config.owner;
    //console.log(Owner)
    const error = new EmbedBuilder()
      .setAuthor({ name: 'Error Restart Bot', iconURL: interaction.guild.iconURL() })
      .setDescription(`\`❌\` | Only My owner Can Use This Command!`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    if (Owner != interaction.user.id) return interaction.reply({ embeds: [error], ephemeral: true })
    let uptime = await os.uptime();
    let d = Math.floor(uptime / (3600 * 24));
    let h = Math.floor((uptime % (3600 * 24)) / 3600);
    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour" : " hours") : "";
    const Started = new EmbedBuilder()
      .setAuthor({
        name: `Restart The System`,
        iconURL: "https://cdn.discordapp.com/emojis/1211122518547632128.gif",
      })
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL()
      .addFields([
        {
          name: "**🤖┆Bot is:**",
          value: `\`Restarting\``,
          inline: true,
        },
        {
          name: "**💻┆Uptime**",
          value: `\`${dDisplay + hDisplay}\``,
          inline: true,
        },
      ])
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    await interaction.reply({ embeds: [Started] })
    process.exit();
  }
};
