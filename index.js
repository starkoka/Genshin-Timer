const { Client, Intents, GatewayIntentBits, Partials} = require('discord.js');
const config = require('./config.json');
const dotenv = require('dotenv');
const cron = require('node-cron');

dotenv.config();
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel],
});


/*スラッシュコマンド登録*/
client.once("ready", async () => {
    const data = [{
        name: "genshintimer",
        description: "about Geshin-Timer",
    }];
    await client.application.commands.set(data, '1004598980291866694');
    console.log("Ready!");
});

/*実際の動作*/
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    if (interaction.commandName === 'genshintimer') {
        const about = {
            color: 0x27668D,
            title: 'About this bot',
            author: {
                name: 'Genshin-timer',
                icon_url: 'https://pbs.twimg.com/profile_images/1493013339517202434/rosL8p8t_400x400.jpg',
                url: 'https://github.com/starkoka/Genshin-Timer',
            },
            description: '原神の様々な通知を行うことができるタイマーbotです\n\n',
            fields: [
                {
                    name: 'デイリー通知機能',
                    value: 'デイリーミッションの更新や、週ボスの更新等をお知らせします。\n',
                },
                {
                    name: 'リポップ通知機能',
                    value: 'coming soon...\n',
                },
                {
                    name: '樹脂回復通知機能',
                    value: 'coming soon...\n',
                },
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Developed by @kokastar_studio',
                icon_url: 'https://pbs.twimg.com/profile_images/1503219566478229506/0dkJeazd_400x400.jpg',
            },
        };
        await interaction.reply({ embeds: [about] });

    }
});

/*毎朝5時のデイリー通知*/
cron.schedule('* 5 * * *', () => {
    const embeds = {
        color: 0x27668D,
        title: 'デイリー更新',
        author: {
            name: 'Genshin-timer',
            icon_url: 'https://pbs.twimg.com/profile_images/1493013339517202434/rosL8p8t_400x400.jpg',
            url: 'https://github.com/starkoka/Genshin-Timer',
        },
        description: 'デイリーが更新されました。忘れずに4つ+追加報酬を受け取りましょう\n\n',
        timestamp: new Date().toISOString(),
        footer: {
            text: 'Developed by @kokastar_studio',
            icon_url: 'https://pbs.twimg.com/profile_images/1503219566478229506/0dkJeazd_400x400.jpg',
        },
    };
    client.channels.cache.get(config.daily).send({embeds: [embeds]})

    console.log('デイリー通知送信完了')
});

client.login(config.token);