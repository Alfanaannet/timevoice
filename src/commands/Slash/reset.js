const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js");
const autosetupSchema = require("../../handlers/db/autosetup.js");
// const temproomSchema = require("../../handlers/db/temproom.js");
const settingsSchema = require("../../handlers/db/settings.js");
const channelcountSchema = require("../../handlers/db/channelcount.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription('Temporary Voice Reset Settings')
  //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  ,
  run: async (client, interaction) => {
    const error = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Reset', iconURL: interaction.guild.iconURL() })
      .setDescription(`You Must Be An Administrator To Perform This Action.`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)) return  interaction.reply({ embeds: [error], ephemeral: true })
    const autosetup = await autosetupSchema.findOne({ guild: interaction.guild.id });
    if (autosetup){
      await autosetup.deleteOne();
    }
    const channelcount = await channelcountSchema.findOne({ guild: interaction.guild.id });
    if (channelcount){
      await channelcount.deleteOne();
    }
    const settings = await settingsSchema.findOne({ guild: interaction.guild.id });
    if (settings){
      await settings.deleteOne();
    }
    // const autosetup = await autosetupSchema.findOne({ guild: interaction.guild.id });
    // if (autosetup){
    //   await autosetup.deleteOne();
    // }
    const eEmbed = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Reset', iconURL: interaction.guild.iconURL() })
      .setDescription(`Settings Reset Successfully`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })

    interaction.reply({ embeds: [eEmbed], ephemeral: true })
  }
};