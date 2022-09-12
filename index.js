const { Client, Intents, GatewayIntentBits, Partials} = require('discord.js');
const config = require('./config.json');
const dotenv = require('dotenv');
const cron = require('node-cron');
require('date-utils');

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
    const daily = {
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
    client.channels.cache.get(config.daily).send({embeds: [daily]})
    var dt = new Date();
    var dayofweek = dt.getDay();
    var date = dt.getDate();
    if(dayofweek==1){ /*月曜日*/
        const monday = {
            color: 0x27668D,
            title: '新しい週が始まりました',
            description: '新しい週が始まり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '週ボスリセット',
                    value: 'トワリン、アンドリアス、タルタリア、若陀龍王、淑女、雷電将軍の報酬が再度受け取れるようになりました。\nまた、樹脂半減回数がリセットされました。',
                },
                {
                    name: '評判任務更新',
                    value: 'モンド、璃月、稲妻、スメール各国の評判任務が更新されました。\n',
                },
                {
                    name: '「緋紅の願い」リセット',
                    value: 'ドラゴンスパインのクエスト「緋紅の願い」が再挑戦できるようになりました。\n',
                },
                {
                    name: 'アイテム購入回数リセット',
                    value: '加工済み食材・洞天百貨宝貨・四方八方の網の購入回数がリセットされました。\n',
                },
                {
                    name: '木材変転回数リセット',
                    value: '木材変転の上限回数がリセットされました。\n',
                },
                {
                    name: '週間限定ギフトパック購入回数リセット',
                    value: '週間限定ギフトパックの購入上限回数がリセットされました。\n',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [monday]})
    }

    if(dayofweek==4){ /*木曜日*/
        const thursday = {
            color: 0x27668D,
            title: '木曜日になりました',
            description: '木曜日になり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '聖遺物購入回数リセット',
                    value: '聖遺物の購入回数上限がリセットされました',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [thursday]})
    }

    if(dayofweek==5){ /*金曜日*/
        const friday = {
            color: 0x27668D,
            title: '金曜日になりました',
            description: '金曜日になり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '「緋紅の願い」リセット',
                    value: 'ドラゴンスパインのクエスト「緋紅の願い」が再挑戦できるようになりました。\n',
                },
                {
                    name: '周回する壺の精霊出現',
                    value: '自分の塵歌壺内で商品を購入可能になりました(日曜日まで)',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [friday]})
    }

    if(dayofweek==6){ /*土曜日*/
        const saturday = {
            color: 0x27668D,
            title: '土曜日になりました',
            description: '土曜日になり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '他人の壺の精霊で購入可能に',
                    value: '他人のの塵歌壺内で商品を購入可能になりました。(日曜日まで)',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [saturday]})
    }
    if(date%3==0){ /*3の倍数の日*/
        const multiple = {
            color: 0x27668D,
            title: 'アイテム購入リセット',
            description: '博来・長順以外の★4以上の食べ物、食材、素材、特産品購入がリセットされました\n\n',
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [multiple]})
    }
    if(date%3==1){ /*3の倍数+1の日*/
        const multiple2 = {
            color: 0x27668D,
            title: 'アイテム購入リセット',
            description: '博来・長順の★4以上の食べ物、食材、素材、特産品購入がリセットされました\n\n',
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [multiple2]})
    }

    if(date==1){ /*毎月1日*/
        const first = {
            color: 0x27668D,
            title: '1日になりました',
            description: '月が変わり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '螺旋リセット',
                    value: '螺旋9~12層がリセットされました。',
                },
                {
                    name: 'スター交換ラインナップ更新・リセット',
                    value: 'スターライト交換のラインナップが更新されました。\nまた、スターライト交換・スターダスト交換の購入回数上限がリセットされました。',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [first]})
    }
    if(date==16){ /*毎月16日*/
        const sixteenth = {
            color: 0x27668D,
            title: '16日になりました',
            description: '月の後半に入り、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '螺旋リセット',
                    value: '螺旋9~12層がリセットされました。',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [sixteenth]})
    }

    console.log('デイリー通知送信完了')
});

client.login(config.token);