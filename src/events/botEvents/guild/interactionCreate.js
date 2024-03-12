const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType, PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder, InteractionType } = require('discord.js');
const temproom = require("../../../handlers/db/temproom.js");
module.exports.run = async (client, Interaction) => {
  const notinvoice = new EmbedBuilder()
    .setAuthor({ name: '| Error Temp Voice', iconURL: "https://cdn.discordapp.com/emojis/1211120341901123624.png" })
    .setDescription(`\`❌\` | You are not in voice channel.`)
    .setTimestamp()
    .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
  const OwnerIfThe = new EmbedBuilder()
    .setAuthor({ name: '| Error Temp Voice', iconURL: "https://cdn.discordapp.com/emojis/1211120341901123624.png" })
    .setDescription(`\`❌\` | You Are Not a Owner If The Tempvoice Channel`)
    .setTimestamp()
    .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
  // const emute = new EmbedBuilder()
  // .setAuthor({ name: '| Error Temp Voice', iconURL: "https://cdn.discordapp.com/emojis/1211120341901123624.png" })
  // .setDescription(`\`❌\` | The Users Limit Has Been Changed From \`${Channel.userLimit || '0'}\` to \`${Number}\``)
  // .setTimestamp()
  // .setFooter({ text: 'Made with 💖 Its Elfanaan', iconURL: client.user.displayAvatarURL() })
  // const eunmute = new EmbedBuilder()
  // .setAuthor({ name: '| Error Temp Voice', iconURL: "https://cdn.discordapp.com/emojis/1211120341901123624.png" })
  // .setDescription(`\`❌\` | The Users Limit Has Been Changed From \`${Channel.userLimit || '0'}\` to \`${Number}\``)
  // .setTimestamp()
  // .setFooter({ text: 'Made with 💖 Its Elfanaan', iconURL: client.user.displayAvatarURL() })
  if (Interaction.isButton()) {
    const Channel = Interaction.member.voice.channel;
    if (!Channel) return Interaction.reply({ embeds: [notinvoice], ephemeral: true })
    const Data = await temproom.findOne({ guid: Interaction.guild.id, id: Interaction.user.id });
    if (!Data || Data.room !== Channel.id) return Interaction.reply({ embeds: [OwnerIfThe], ephemeral: true })
    switch (Interaction.customId) {
      case 'LockChannel': {
        await Interaction.deferUpdate().catch(() => { })
        Interaction.member.voice.channel.permissionOverwrites.set([
          {
            id: Interaction.guild.roles.everyone.id,
            deny: [
              PermissionsBitField.Flags.Connect
            ]
          },
          {
            id: Interaction.user.id,
            allow: [
              PermissionsBitField.Flags.Connect
            ]
          }
        ])
      }
        break;
      case 'UnlockChannel': {
        await Interaction.deferUpdate().catch(() => { })
        Interaction.member.voice.channel.permissionOverwrites.set([
          {
            id: Interaction.guild.roles.everyone.id,
            allow: [
              PermissionsBitField.Flags.Connect
            ]
          }
        ])
      }
        break;
      case 'HideChannel': {
        await Interaction.deferUpdate().catch(() => { })
        Interaction.member.voice.channel.permissionOverwrites.set([
          {
            id: Interaction.guild.roles.everyone.id,
            deny: [
              PermissionsBitField.Flags.ViewChannel
            ]
          },
          {
            id: Interaction.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel
            ]
          }
        ])
      }
        break;
      case 'UnhideChannel': {
        await Interaction.deferUpdate().catch(() => { })
        Interaction.member.voice.channel.permissionOverwrites.set([
          {
            id: Interaction.guild.roles.everyone.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel
            ]
          }
        ])
      }
        break;
      case 'RenameChannel': {
        const Modal = new ModalBuilder()
          .setCustomId('RenameModal')
          .setTitle('Rename Channel')
        const Name = new TextInputBuilder()
          .setStyle(TextInputStyle.Short)
          .setLabel('THE NEW NAME')
          .setMaxLength(50)
          .setCustomId('Name')
          .setRequired(true)
        const Row = new ActionRowBuilder().addComponents(Name)
        Modal.addComponents(Row)
        Interaction.showModal(Modal)
      }
        break;
      case 'Mute': {
        await Interaction.deferUpdate().catch(() => { })
        Channel.members.forEach(async Members => {
          const Member = Interaction.guild.members.cache.get(Members.id)
          if (Member.id !== Interaction.user.id) Member.voice.setMute(true)
        })
      }
        break;
      case 'Unmute': {
        await Interaction.deferUpdate().catch(() => { })
        Channel.members.forEach(async Members => {
          const Member = Interaction.guild.members.cache.get(Members.id)
          if (Member.id !== Interaction.user.id) Member.voice.setMute(false)
        })
      }
        break;
      case 'Disconnect': {
        await Interaction.deferUpdate().catch(() => { })
        Channel.members.forEach(async Members => {
          const Member = Interaction.guild.members.cache.get(Members.id)
          if (Member.id !== Interaction.user.id) Member.voice.disconnect()
        })
      }
        break;
      case 'Delete_Channel': {
        await Interaction.deferUpdate().catch(() => { })
        await Data.deleteOne();
        await Channel.delete()
      }
        break;
      case 'Ban_Member': {
        const User = new UserSelectMenuBuilder().setPlaceholder('Select the User').setCustomId('UserMenu').setMaxValues(1)
        const Row = new ActionRowBuilder().addComponents(User)
        Interaction.reply({ content: `_ _`, components: [Row], ephemeral: true })
      }
        break;
      case 'UsersManager': {
        const Row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1085177845065728062')
            .setLabel('Mute')
            .setCustomId('UsersManager_Mute'),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1085177849322946612')
            .setLabel('Unmute')
            .setCustomId('UsersManager_Unmute'),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1085177846911221770')
            .setLabel('Deafen')
            .setCustomId('UsersManager_Deafen'),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('1085177842016452698')
            .setLabel('Undeafen')
            .setCustomId('UsersManager_Undeafen'))
        Interaction.reply({ content: '_ _', components: [Row], ephemeral: true })
      }
        break;
      case 'Customize_UserLimit': {
        const Modal = new ModalBuilder()
          .setCustomId('Customize_UsersLimit')
          .setTitle('Customize Users Limit')
        const Number = new TextInputBuilder()
          .setStyle(TextInputStyle.Short)
          .setLabel('The Number')
          .setMaxLength(2)
          .setCustomId('The_Number')
          .setRequired(true)
        const Row = new ActionRowBuilder().addComponents(Number)
        Modal.addComponents(Row)
        Interaction.showModal(Modal)
      }
    }
  } else if (Interaction.isStringSelectMenu()) {
    const Channel = Interaction.member.voice.channel;
    if (!Channel) return Interaction.reply({ embeds: [notinvoice], ephemeral: true })
    const Data = await temproom.findOne({ guid: Interaction.guild.id, id: Interaction.user.id });
    //console.log(Data)
    if (Data.room !== Channel.id) return Interaction.reply({ embeds: [OwnerIfThe], ephemeral: true })
    if (Interaction.customId == 'Menu') {
      await Interaction.deferUpdate().catch(() => { })
      if (Interaction.guild.channels.cache.get(Channel.id).type === ChannelType.GuildVoice) {
        Interaction.guild.channels.cache.get(Channel.id).setUserLimit(Interaction.values[0])
      }
    }
  } else if (Interaction.isModalSubmit()) {
    const Channel = Interaction.member.voice.channel;
    if (!Channel) return Interaction.reply({ embeds: [notinvoice], ephemeral: true })
    const Data = await temproom.findOne({ guid: Interaction.guild.id, id: Interaction.user.id });
    if (Data.room !== Channel.id) return Interaction.reply({ embeds: [OwnerIfThe], ephemeral: true })
    if (Interaction.customId == 'RenameModal') {
      const Name = Interaction.fields.getTextInputValue('Name')
      await Channel.setName(Name)
      const Successfully  = new EmbedBuilder()
      .setAuthor({ name: '| Temp Voice', iconURL: "https://cdn.discordapp.com/emojis/1211137342363013150.png" })
      .setDescription(`:ballot_box_with_check: | The Channel Has Been Successfully Changed.`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
      Interaction.reply({ embeds: [Successfully], ephemeral: true })
    } else if (Interaction.customId == 'Customize_UsersLimit') {
      const Number = Interaction.fields.getTextInputValue('The_Number')
      const UsersLimitAlready = new EmbedBuilder()
        .setAuthor({ name: '| Error Temp Voice', iconURL: "https://cdn.discordapp.com/emojis/1211120341901123624.png" })
        .setDescription(`\`❌\` | The Users Limit Is Already \`${Number}\``)
        .setTimestamp()
        .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
      if (Channel.userLimit == Number) return Interaction.reply({ embeds: [UsersLimitAlready], ephemeral: true })
      const UsersLimit = new EmbedBuilder()
        .setAuthor({ name: '| Error Temp Voice', iconURL: "https://cdn.discordapp.com/emojis/1211120341901123624.png" })
        .setDescription(`\`❌\` | The Users Limit Has Been Changed From \`${Channel.userLimit || '0'}\` to \`${Number}\``)
        .setTimestamp()
        .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
      Interaction.reply({ embeds: [UsersLimit], ephemeral: true })
      await Channel.setUserLimit(Number)
    }

    //}

    // ERORR HANDLING
  }
  if (Interaction.isButton()) {
    const Channel = Interaction.member.voice.channel;
    const _error = new EmbedBuilder()
    if (!Channel) return Interaction.reply({ embeds: [notinvoice], ephemeral: true })
    const Data = await temproom.findOne({ guid: Interaction.guild.id, id: Interaction.user.id });
    if (Data.room !== Channel.id) return Interaction.reply({ embeds: [OwnerIfThe], ephemeral: true })
    switch (Interaction.customId) {
      case 'UsersManager_Mute': {
        const Row = new ActionRowBuilder()
          .addComponents(
            new UserSelectMenuBuilder()
              .setPlaceholder('Select the User from the Menu')
              .setCustomId('UserManager_Mute')
              .setMaxValues(1)
          )
        Interaction.reply({ content: '_ _', components: [Row], ephemeral: true })
      }
        break;
      case 'UsersManager_Unmute': {
        const Row = new ActionRowBuilder()
          .addComponents(
            new UserSelectMenuBuilder()
              .setPlaceholder('Select the User from the Menu')
              .setCustomId('UserManager_Unmute')
              .setMaxValues(1))
        Interaction.reply({ content: '_ _', components: [Row], ephemeral: true })
      }
        break;

      case 'UsersManager_Deafen': {
        const Row = new ActionRowBuilder()
          .addComponents(
            new UserSelectMenuBuilder()
              .setPlaceholder('Select the User from the Menu')
              .setCustomId('UserManager_Deafen')
              .setMaxValues(1)
          )
        Interaction.reply({ content: '_ _', components: [Row], ephemeral: true })
      }
        break;
      case 'UsersManager_Undeafen': {
        const Row = new ActionRowBuilder()
          .addComponents(
            new UserSelectMenuBuilder()
              .setPlaceholder('Select the User from the Menu')
              .setCustomId('UserManager_Undeafen')
              .setMaxValues(1)
          )
        Interaction.reply({ content: '_ _', components: [Row], ephemeral: true })
      }
    }
  } else if (Interaction.isUserSelectMenu()) {
    const Channel = Interaction.member.voice.channel;
    if (!Channel) return Interaction.reply({ embeds: [notinvoice], ephemeral: true })
    const Data = await temproom.findOne({ guid: Interaction.guild.id, id: Interaction.user.id });
    if (Data.room !== Channel.id) return Interaction.reply({ embeds: [OwnerIfThe], ephemeral: true })
    switch (Interaction.customId) {
      case 'UserManager_Mute': {
        await Interaction.deferUpdate().catch(() => { })
        Interaction.member.voice.channel.members.filter((Member) => Member.user.id == Interaction.values[0]).forEach((User) => {
          const Member = Interaction.guild.members.cache.get(User.id)
          Member.voice.setMute(true)
        })
      }
        break;
      case 'UserManager_Unmute': {
        await Interaction.deferUpdate().catch(() => { })
        Interaction.member.voice.channel.members.filter((Member) => Member.user.id == Interaction.values[0]).forEach((User) => {
          const Member = Interaction.guild.members.cache.get(User.id)
          Member.voice.setMute(false)
        })
      }
        break;
      case 'UserManager_Deafen': {
        await Interaction.deferUpdate().catch(() => { })
        Interaction.member.voice.channel.members.filter((Member) => Member.user.id == Interaction.values[0]).forEach((User) => {
          const Member = Interaction.guild.members.cache.get(User.id)
          Member.voice.setDeaf(true)
        })
      }
        break;
      case 'UserManager_Undeafen': {
        await Interaction.deferUpdate().catch(() => { })
        Interaction.member.voice.channel.members.filter((Member) => Member.user.id == Interaction.values[0]).forEach((User) => {
          const Member = Interaction.guild.members.cache.get(User.id)
          Member.voice.setDeaf(false)
        })
      }
    }
  }
  if (Interaction.type === InteractionType.ApplicationCommand) {
    const command = client.slashCommands.get(Interaction.commandName);
    if (!command) return;
    const warning = new EmbedBuilder()
      .setAuthor({ name: 'Temp Voice Error', iconURL: Interaction.guild.iconURL() })
      .setDescription(`\`❌\` | Something went wrong.`)
      .setTimestamp()
      .setFooter({ text: 'Made with 💖 Aw Elfanaan', iconURL: client.user.displayAvatarURL() })
    // ERORR HANDLING
    try {
      command.run(client, Interaction);
    } catch (error) {
      return Interaction.reply({ embeds: [warning], ephmeral: true });
    }
  }
};
