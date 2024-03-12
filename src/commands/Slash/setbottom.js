const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js");
const bottom = require("../../handlers/db/bottom.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('setbottom')
    .setDescription('Temp Voice Channel Setup')
    .addBooleanOption(option => option.setName('lockchannel')
      .setDescription('Bottom Dashboard Lock Channel Control | True = On / False = Off')
      .setRequired(true))
    .addBooleanOption(option => option.setName('hidechannel')
      .setDescription('Bottom Dashboard Hide Channel Control | True = On / False = Off')
      .setRequired(true))
    .addBooleanOption(option => option.setName('mute')
      .setDescription('Bottom Dashboard Mute Channel Control | True = On / False = Off')
      .setRequired(true))
    .addBooleanOption(option => option.setName('disconnect')
      .setDescription('Bottom Dashboard Disconnect Channel Control | True = On / False = Off')
      .setRequired(true))
    .addBooleanOption(option => option.setName('usersmanager')
      .setDescription('Bottom Dashboard Users Manager Control | True = On / False = Off')
      .setRequired(true))
    .addBooleanOption(option => option.setName('deletechannel')
      .setDescription('Bottom Dashboard Delete Channel Control | True = On / False = Off')
      .setRequired(true))
    .addBooleanOption(option => option.setName('renamechannel')
      .setDescription('Bottom Dashboard Rename Channel Control | True = On / False = Off')
      .setRequired(true))
    ,
  run: async (client, interaction) => {
    const error = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Bottom Setup', iconURL: interaction.guild.iconURL() })
      .setDescription(`You Must Be An Administrator To Perform This Action.`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })

    if (!interaction.member.permissionsIn(interaction.channel).has(PermissionsBitField.Flags.Administrator)) return  interaction.reply({ embeds: [error], ephemeral: true })
    const lockchannel = interaction.options.getBoolean("lockchannel");
    const hidechannel = interaction.options.getBoolean("hidechannel");
    const mute = interaction.options.getBoolean("mute");
    const disconnect = interaction.options.getBoolean("disconnect");
    const usersmanager = interaction.options.getBoolean("usersmanager");
    const deletechannel = interaction.options.getBoolean('deletechannel');
    const renamechannel = interaction.options.getBoolean('renamechannel');
    const data = await bottom.findOne({ guild: interaction.guild.id });
    if (data) {
      data.lockchannel = lockchannel,
      data.hidechannel = hidechannel,
      data.mute = mute,
      data.disconnect = disconnect,
      data.usersmanager = usersmanager,
      data.deletechannel = deletechannel,
      data.renamechannel = renamechannel
      data.save();
    }
    else {
      new bottom({
        guild: interaction.guild.id,
        lockchannel: lockchannel,
        hidechannel: hidechannel,
        mute: mute,
        disconnect: disconnect,
        usersmanager: usersmanager,
        deletechannel: deletechannel,
        renamechannel: renamechannel,
      }).save();
    }
    const eEmbed = new EmbedBuilder()
    .setAuthor({ name: 'Temp Voice Setup', iconURL: interaction.guild.iconURL() })
    .setDescription(`Bottom Settings Completed Successfully \nPlease Use \`/dashboard\` To Send Dashboard`)
    .setTimestamp()
    .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    interaction.reply({ embeds: [eEmbed], ephemeral: true })
  }
};