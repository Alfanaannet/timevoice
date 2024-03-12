const { ActivityType } = require("discord.js");
module.exports.run = async (client) => {
  setInterval(async () => {
    const Activity = [
      {
        type: ActivityType.Listening,
        name: "・💻┆/setup"
      },
      // {
      //   type: ActivityType.Playing,
      //   name: "・💻┆ITS COMMUNITY"
      // },
      {
        type: ActivityType.Listening,
        name: "・❓┆/autosetup"
      }
    ];
    const status = [
      {
        type: "idle"
      },
      {
        type: "dnd"
      }
    ];

    const index = Math.floor(Math.random() * Activity.length);
    await client.user.setStatus(status[index].type); client.user.setActivity(Activity[index].name, { type: Activity[index].type });
  }, 4000);

  console.log(`[INFO] ${client.user.username} is ready with ${client.guilds.cache.size} server`);
};