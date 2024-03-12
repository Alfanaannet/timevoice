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
              .setEmoji('1211830692674146354')
              .setLabel('Lock')
              .setCustomId('LockChannel')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1211830694448201778')
              .setLabel('Unlock')
              .setCustomId('UnlockChannel')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1211830913957236776')
              .setLabel('Hide')
              .setCustomId('HideChannel')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1211830911440519180')
              .setLabel('Unhide')
              .setCustomId('UnhideChannel')
              .setDisabled(false))
        const RowTwo = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1212088239792332892')
              .setLabel('Mute')
              .setCustomId('Mute')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1212089587397304362')
              .setLabel('Unmute')
              .setCustomId('Unmute')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1212129328675168296')
              .setLabel('Customize Users')
              .setCustomId('Customize_UserLimit')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Danger)
              .setEmoji('1212140069121691658')
              .setLabel('Disconnect')
              .setCustomId('Disconnect')
              .setDisabled(false))
        const RowThree = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1212128380909129828')
              .setLabel('Users Manager')
              .setCustomId('UsersManager')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setEmoji('1079515862928740363')
              .setLabel('Delete  Channel')
              .setCustomId('Delete_Channel')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Primary)
              .setEmoji('🗒️')
              .setLabel('Rename')
              .setCustomId('RenameChannel')
              .setDisabled(false)
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
