const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js");
const bottomSchema = require("../../handlers/db/bottom.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('dashboard')
    .setDescription('Temp Voice Setup Dashbord')
    .addChannelOption(option => option.setName('room')
      .setDescription('Temp Voice Channel Dahsboard')
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildText))
  ,
  run: async (client, interaction) => {
    const error = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Channel Setup Dahsboard', iconURL: interaction.guild.iconURL() })
      .setDescription(`You Must Be An Administrator To Perform This Action.`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })

    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [error], ephemeral: true })
    const channel = interaction.options.getChannel("room") || "11";
    const bottom = await bottomSchema.findOne({ guild: interaction.guild.id });
    if (!bottom) {
      new bottomSchema({
        guild: interaction.guild.id,
        lockchannel: true,
        hidechannel: true,
        mute: true,
        customizeusers: true,
        disconnect: true,
        usersmanager: true,
        deletechannel: true,
        renamechannel: true
      }).save();
    }
    const Embed = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Dashboard', iconURL: interaction.guild.iconURL() })
      .setDescription(`Click on the Button to Control your Temp Voice Channel`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    const RowOne = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('1079515867374698538')
          .setLabel('Lock')
          .setCustomId('LockChannel')
        .setDisabled(bottom.lockchannel === false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('1079515869320855624')
          .setLabel('Unlock')
          .setCustomId('UnlockChannel')
        .setDisabled(bottom.lockchannel === false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('1084858277730455683')
          .setLabel('Hide')
          .setCustomId('HideChannel')
        .setDisabled(bottom.hidechannel === false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('1084859746605076480')
          .setLabel('Unhide')
          .setCustomId('UnhideChannel')
      .setDisabled(bottom.hidechannel === false))
    const RowTwo = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('1079515864891674694')
          .setLabel('Mute')
          .setCustomId('Mute')
          .setDisabled(bottom.mute === false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('1079515872118444062')
          .setLabel('Unmute')
          .setCustomId('Unmute')
          .setDisabled(bottom.mute === false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('1084915797463404614')
          .setLabel('Customize Users')
          .setCustomId('Customize_UserLimit')
          .setDisabled(bottom.customizeusers === false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Danger)
          .setEmoji('1079515860516999290')
          .setLabel('Disconnect')
          .setCustomId('Disconnect')
        .setDisabled(bottom.disconnect === false))
    const RowThree = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('1085174405895835699')
          .setLabel('Users Manager')
          .setCustomId('UsersManager')
          .setDisabled(bottom.usersmanager === false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setEmoji('1079515862928740363')
          .setLabel('Delete  Channel')
          .setCustomId('Delete_Channel')
          .setDisabled(bottom.deletechannel === false),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Primary)
          .setEmoji('🗒️')
          .setLabel('Rename')
          .setCustomId('RenameChannel')
          .setDisabled(bottom.renamechannel === false)
      )
    const eEmbed = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Setup Dashboard', iconURL: interaction.guild.iconURL() })
      .setDescription(`Settings Completed Successfully`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    const echannel = client.channels.cache.get(channel.id);
    if (echannel) {
      echannel.send({ embeds: [Embed], components: [RowOne, RowTwo, RowThree] });
    }
    interaction.reply({ embeds: [eEmbed], ephemeral: true })
  }
};