const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js");
const voiceSchema = require("../../handlers/db/autosetup.js");
const bottomSchema = require("../../handlers/db/bottom.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('autosetup')
    .setDescription('Temp Voice Channel Auto Setup')
  //.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
  ,
  run: async (client, interaction) => {
    const error = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Auto Setup', iconURL: interaction.guild.iconURL() })
      .setDescription(`You Must Be An Administrator To Perform This Action.`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [error], ephemeral: true })
    //interaction.reply({ content: `You Are Not a Owner If The Server`, ephemeral: true })
    const data = await voiceSchema.findOne({ guild: interaction.guild.id });
    const bottom = await bottomSchema.findOne({ guild: interaction.guild.id });
    interaction.guild.channels.create({
      name: "Temp Voice",
      type: Discord.ChannelType.GuildCategory,
    }).then((cat) => {
      interaction.guild.channels.create({
        name: "⌨ Dashboard",
        type: Discord.ChannelType.GuildText,
        parent: cat.id,
        permissionOverwrites: [
          {
            deny: [Discord.PermissionsBitField.Flags.SendMessages],
            id: interaction.guild.id
          },
        ],
      }).then((channel) => {
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
              .setEmoji('1079515867374698538')
              .setLabel('Lock')
              .setCustomId('LockChannel')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1079515869320855624')
              .setLabel('Unlock')
              .setCustomId('UnlockChannel')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1084858277730455683')
              .setLabel('Hide')
              .setCustomId('HideChannel')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1084859746605076480')
              .setLabel('Unhide')
              .setCustomId('UnhideChannel')
              .setDisabled(false))
        const RowTwo = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1079515864891674694')
              .setLabel('Mute')
              .setCustomId('Mute')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1079515872118444062')
              .setLabel('Unmute')
              .setCustomId('Unmute')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1084915797463404614')
              .setLabel('Customize Users')
              .setCustomId('Customize_UserLimit')
              .setDisabled(false),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Danger)
              .setEmoji('1079515860516999290')
              .setLabel('Disconnect')
              .setCustomId('Disconnect')
              .setDisabled(false))
        const RowThree = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setEmoji('1085174405895835699')
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
        const echannel = client.channels.cache.get(channel.id);
        if (echannel) {
          echannel.send({ embeds: [Embed], components: [RowOne, RowTwo, RowThree] });
        }
        interaction.guild.channels.create({
          name: "➕ Create Voice",
          type: Discord.ChannelType.GuildVoice,
          parent: cat.id,
          permissionOverwrites: [
            {
              deny: [Discord.PermissionsBitField.Flags.Speak],
              id: interaction.guild.id
            },
          ],
        }).then((ch) => {
          if (data) {
            data.autocategory = cat.id;
            data.autovoice = ch.id
            data.autodash = channel.id
            data.save();
          }
          else {
            new voiceSchema({
              guild: interaction.guild.id,
              autodash: channel.id,
              autovoice: ch.id,
              autocategory: cat.id,
            }).save();
          }
        });
      });
    });

    // const channel = await voiceSchema.findOne({ guild: interaction.guild.id });
    // console.log(channel)
    const eEmbed = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Auto Setup', iconURL: interaction.guild.iconURL() })
      .setDescription(`Settings Completed Successfully`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })

    interaction.reply({ embeds: [eEmbed], ephemeral: true })
  }
};