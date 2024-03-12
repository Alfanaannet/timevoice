const { readdirSync } = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
    const data = [];
  
    readdirSync("./src/commands/").forEach((dir) => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith(".js"));
  
        for (const file of commands) {
            const pull = require(path.join(__dirname, `../commands/${dir}/${file}`));

            if (pull.data.name) {
                client.slashCommands.set(pull.data.name, pull);
                data.push(pull.data);
              // client.commands.set(command.data.name, command);
              // commands.push(command.data);
            } else {
                continue;
            }
        }
    });

    client.on("ready", async () => {
        await client.application.commands.set(data);

        console.log(`[INFO] ${client.slashCommands.size} Slash Commands Loaded!`);
    });
};
