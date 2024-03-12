const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js");
const voiceSchema = require("../../handlers/db/settings.js");
const bottomSchema = require("../../handlers/db/bottom.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Temp Voice Channel Setup')
    //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option => option.setName('room')
      .setDescription('Temp Voice Room Number 1')
      .setRequired(true)
      .addChannelTypes(ChannelType.GuildVoice))
    .addChannelOption(option => option.setName('room1')
      .setDescription('Temp Voice Room Number 2')
      .setRequired(false)
      .addChannelTypes(ChannelType.GuildVoice))
    .addChannelOption(option => option.setName('room2')
      .setDescription('Temp Voice Room Number 3')
      .setRequired(false)
      .addChannelTypes(ChannelType.GuildVoice))
    .addChannelOption(option => option.setName('room3')
      .setDescription('Temp Voice Room Number 4')
      .setRequired(false)
      .addChannelTypes(ChannelType.GuildVoice))
    .addChannelOption(option => option.setName('room4')
      .setDescription('Temp Voice Room Number 5')
      .setRequired(false)
      .addChannelTypes(ChannelType.GuildVoice))
    .addChannelOption(option => option.setName('dashboard')
      .setDescription('Temp Voice Room Dashboard Control')
      .setRequired(false)
      .addChannelTypes(ChannelType.GuildText))
    .addStringOption(option => option.setName('channelname')
      .setDescription('Temp Voice Room Name')
      .setRequired(false))
  ,
  run: async (client, interaction) => {
    const error = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Channel Setup', iconURL: interaction.guild.iconURL() })
      .setDescription(`You Must Be An Administrator To Perform This Action.`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })

    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [error], ephemeral: true })
    const channel = interaction.options.getChannel("room") || "11";
    const channel1 = interaction.options.getChannel("room1") || "11";
    const channel2 = interaction.options.getChannel("room2") || "11";
    const channel3 = interaction.options.getChannel("room3") || "11";
    const channel4 = interaction.options.getChannel("room4") || "11";
    // const category = interaction.options.getChannel('category') || "11";
    const ChannelName = interaction.options.getString('channelname') || "{emoji} {channel name}";
    const Dashboard = interaction.options.getChannel('dashboard') || "11";
    const data = await voiceSchema.findOne({ guild: interaction.guild.id });
   // console.log("111")
    if (data) {
      data.room = channel.id,
        data.room1 = channel1.id,
        data.room2 = channel2.id,
        data.room3 = channel3.id,
        data.room4 = channel4.id,
        data.name = ChannelName,
        data.dashboard = Dashboard.id,
        data.save();
    }
    else {
      new voiceSchema({
        guild: interaction.guild.id,
        room: channel.id,
        room1: channel1.id,
        room2: channel2.id,
        room3: channel3.id,
        room4: channel4.id,
        name: ChannelName,
        dashboard: Dashboard.id,
      }).save();
    }
    //console.log("222")
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
      .setDescription(`Click on the Button to Control your Temp Voice`)
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
      .setAuthor({ name: 'Temp Voice Setup', iconURL: interaction.guild.iconURL() })
      .setDescription(`Settings Completed Successfully`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    const echannel = client.channels.cache.get(Dashboard.id);
    if (echannel) {
      echannel.send({ embeds: [Embed], components: [RowOne, RowTwo, RowThree] });
    }
    interaction.reply({ embeds: [eEmbed], ephemeral: true })
  }
};
