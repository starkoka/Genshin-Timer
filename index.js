const { Client, Intents, GatewayIntentBits, Partials} = require('discord.js');
const config = require('./config.json');
const dotenv = require('dotenv');

dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

client.once("ready", async () => {
    const data = [{
        name: "about",
        description: "about this bot",
    }];
    await client.application.commands.set(data, '1004598980291866694');
    console.log("Ready!");
});
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    if (interaction.commandName === 'about') {
        await interaction.reply('テスト');
    }
});

client.login(config.token);