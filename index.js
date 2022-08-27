const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
client.login(config.BOT_TOKEN);

'use strict';




const cron = require('node-cron');
cron.schedule('0 0 5 * * *', () => {
    const now = new Date();
    let date=now.getDate();
    let day=now.getDay();

    client.message.send()

});