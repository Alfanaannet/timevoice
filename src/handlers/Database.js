module.exports = (client) => {
    require("./db/connect.js")();
    require("./db/settings.js")(client);
    require("./db/temproom.js")(client);

    console.log("[INFO] Database Events Loaded!");
};
