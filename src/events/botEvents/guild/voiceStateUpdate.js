const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ChannelType, PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, UserSelectMenuBuilder } = require('discord.js')
const autoroom = require("../../../handlers/db/autosetup.js");
const roomtemp = require("../../../handlers/db/temproom.js");
const settings = require("../../../handlers/db/settings.js");
const channelcount = require("../../../handlers/db/channelcount.js");
module.exports.run = async (client, OldVoice, NewVoice) => {
  let channelName;
  const roomsettings = await settings.findOne({ guild: NewVoice.guild.id });
  const temproom = await roomtemp.findOne({ guid: NewVoice.guild.id, id: OldVoice.member.user.id });
  const roomauto = await autoroom.findOne({ guild: NewVoice.guild.id });
  const count = await channelcount.findOne({ guild: NewVoice.guild.id });
  const user = await client.users.fetch(NewVoice.id);
  const member = NewVoice.guild.members.cache.get(user.id);
  let memberCount;
  let channel;
  
  if (roomsettings) {
    channelName = roomsettings.name || "{emoji} {channel name}";
  } else {
    channelName = "{emoji} {channel name}";
  }
    if (roomauto) {
    channel = client.channels.cache.get(roomauto.autovoice);
    memberCount = channel.members.size;
  } else if (roomsettings) {
    if (roomsettings.room) {
        channel = client.channels.cache.get(roomsettings.room);
        memberCount = channel.members.size;
        if (count) {
            channelcount.guild = NewVoice.guild.id,
            channelcount.ChannelCount = memberCount,
            channelcount.save();
        }
    } else if (roomsettings.room1){
        channel = client.channels.cache.get(roomsettings.room1);
        memberCount = channel.members.size;
      if (count) {
            channelcount.guild = NewVoice.guild.id,
            channelcount.ChannelCount = memberCount,
            channelcount.save();
        }
    } else if (roomsettings.room2){
        channel = client.channels.cache.get(roomsettings.room2);
        memberCount = channel.members.size;
      if (count) {
            channelcount.guild = NewVoice.guild.id,
            channelcount.ChannelCount = memberCount,
            channelcount.save();
        }
    } else if (roomsettings.room3){
        channel = client.channels.cache.get(roomsettings.room3);
        memberCount = channel.members.size;
      if (count) {
            channelcount.guild = NewVoice.guild.id,
            channelcount.ChannelCount = memberCount,
            channelcount.save();
        }
    } else if (roomsettings.room4){
        channel = client.channels.cache.get(roomsettings.room4);
        memberCount = channel.members.size;
      if (count) {
            channelcount.guild = NewVoice.guild.id,
            channelcount.ChannelCount = memberCount,
            channelcount.save();
        }
    }
  }
  if (count) {
    channelName = channelName.replace(`{channel name}`, `Voice ${memberCount}`)
    channelName = channelName.replace(`{channel count}`, `${memberCount}`)
    channelName = channelName.replace(`{emoji}`, "🔊")
    channelName = channelName.replace(`{member}`, `${user.username}`)
    channelName = channelName.replace(`{member tag}`, `${user.tag}`)
  } else {
    new channelcount({
      guild: NewVoice.guild.id,
      ChannelCount: 0,
    }).save();
    channelName = channelName.replace(`{channel name}`, `Voice 1`)
    channelName = channelName.replace(`{channel count}`, `1`)
    channelName = channelName.replace(`{emoji}`, "🔊")
    channelName = channelName.replace(`{member}`, `${user.username}`)
    channelName = channelName.replace(`{member tag}`, `${user.tag}`)
  }

  if (roomsettings) {
    ///////////////////////////////           ROOM 1                  //////////////////////////////////
    if (roomsettings.room) {
      if (NewVoice.channelId == roomsettings.room) {
        await NewVoice.guild.channels.create({
          name: `${channelName}`,
          type: ChannelType.GuildVoice,
          parent: NewVoice.member.voice.channel.parentId,
          userLimit: NewVoice.member.voice.channel.userLimit
        }).then(async Channel => {
          // if (temproom) {
          //   temproom.id = OldVoice.member.user.id,
          //     temproom.room = Channel.id,
          //     temproom.save();
          // } else {
            new roomtemp({
              guid: NewVoice.guild.id,
              id: OldVoice.member.user.id,
              room: Channel.id,
            }).save();
          // }            
            await NewVoice.member.voice.setChannel(Channel)
        })
      }
    }
    /////////////////////////////////           ROOM 2                  //////////////////////////////////
    if (roomsettings.room1) {
      if (NewVoice.channelId == roomsettings.room1) {
        await NewVoice.guild.channels.create({
          name: `${channelName}`,
          type: ChannelType.GuildVoice,
          parent: NewVoice.member.voice.channel.parentId,
          userLimit: NewVoice.member.voice.channel.userLimit
        }).then(async Channel => {
          // if (temproom) {
          //   temproom.id = OldVoice.member.user.id,
          //     temproom.room = Channel.id,
          //     temproom.save();
          // } else {
            new roomtemp({
              guid: NewVoice.guild.id,
              id: OldVoice.member.user.id,
              room: Channel.id,
            }).save();
          // }
            await NewVoice.member.voice.setChannel(Channel)
        })
      }
    }
    /////////////////////////////////           ROOM 3                  //////////////////////////////////
    if (roomsettings.room2) {
      if (NewVoice.channelId == roomsettings.room2) {
        await NewVoice.guild.channels.create({
          name: `${channelName}`,
          type: ChannelType.GuildVoice,
          parent: NewVoice.member.voice.channel.parentId,
          userLimit: NewVoice.member.voice.channel.userLimit
        }).then(async Channel => {
          //  if (temproom) {
          //   temproom.id = OldVoice.member.user.id,
          //     temproom.room = Channel.id,
          //     temproom.save();
          // } else {
            new roomtemp({
              guid: NewVoice.guild.id,
              id: OldVoice.member.user.id,
              room: Channel.id,
            }).save();
           // }
            await NewVoice.member.voice.setChannel(Channel)
        })
      }
    }
    /////////////////////////////////           ROOM 4                  //////////////////////////////////
    if (roomsettings.room3) {
      if (NewVoice.channelId == roomsettings.room3) {
        await NewVoice.guild.channels.create({
          name: `${channelName}`,
          type: ChannelType.GuildVoice,
          parent: NewVoice.member.voice.channel.parentId,
          userLimit: NewVoice.member.voice.channel.userLimit
        }).then(async Channel => {
          //  if (temproom) {
          //   temproom.id = OldVoice.member.user.id,
          //     temproom.room = Channel.id,
          //     temproom.save();
          // } else {
            new roomtemp({
              guid: NewVoice.guild.id,
              id: OldVoice.member.user.id,
              room: Channel.id,
            }).save();
           // }
            await NewVoice.member.voice.setChannel(Channel)
        })
      }
    }
    /////////////////////////////////           ROOM 5                  //////////////////////////////////
    if (roomsettings.room4) {
      if (NewVoice.channelId == roomsettings.room4) {
        await NewVoice.guild.channels.create({
          name: `${channelName}`,
          type: ChannelType.GuildVoice,
          parent: NewVoice.member.voice.channel.parentId,
          userLimit: NewVoice.member.voice.channel.userLimit
        }).then(async Channel => {
         // if (temproom) {
         //    temproom.id = OldVoice.member.user.id,
         //      temproom.room = Channel.id,
         //      temproom.save();
         //  } else {
            new roomtemp({
              guid: NewVoice.guild.id,
              id: OldVoice.member.user.id,
              room: Channel.id,
            }).save();
         // }
            await NewVoice.member.voice.setChannel(Channel)
        })
      }
    }
  }
  /////////////////////////////////          AUTO ROOM 1                 //////////////////////////////////
  if (roomauto) {
    let ChannelCount;
    if (NewVoice.channelId == roomauto.autovoice) {
      if (count.ChannelCount) {
        count.ChannelCount += 1;
        count.save();
        ChannelCount = count.ChannelCount || 1;
      }
      else {
        count.ChannelCount = 1;
        count.save();
        ChannelCount = count.ChannelCount || 1;
      }
      await NewVoice.guild.channels.create({
        name: `🔊 Voice ${ChannelCount}`,
        type: ChannelType.GuildVoice,
        parent: NewVoice.member.voice.channel.parentId,
        userLimit: NewVoice.member.voice.channel.userLimit
      }).then(async Channel => {
       // if (temproom) {
       //      temproom.id = OldVoice.member.user.id,
       //        temproom.room = Channel.id,
       //        temproom.save();
       //    } else {
            new roomtemp({
              guid: NewVoice.guild.id,
              id: OldVoice.member.user.id,
              room: Channel.id,
            }).save();
           // }
            await NewVoice.member.voice.setChannel(Channel)
      })
    }
  }
  setInterval(async () => {
    const ttemproom = await roomtemp.findOne({ guid: NewVoice.guild.id, id: OldVoice.member.user.id });
    if (ttemproom) {
      if (ttemproom.room == OldVoice.channelId) {
        if (OldVoice.channelId !== null) {
          if (OldVoice.channel.members.filter(x => !x.user.bot).size == 0) {
            let channel = OldVoice.guild.channels.cache.get(OldVoice.channelId)
            await channel.delete();
            await ttemproom.deleteOne();
            if (memberCount < 1 || memberCount == 0) {
              if (count.ChannelCount) {
                try {
                  count.ChannelCount -= 1;
                  count.save().catch(e => { });
                }
                catch { }
              }
            }
          }
        }
      }
    }
  }, 1000)
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
