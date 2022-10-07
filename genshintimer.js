const { Client,  GatewayIntentBits, Partials} = require('discord.js');
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
    const genshintimer = {
        name: "genshintimer",
        description: "about Geshin-Timer",
    };


    const jushi = {
        name: "jushi",
        description: "樹脂が設定した量まで回復したら通知します",
        options:[{
            type:3,
            name:"現在",
            description: "現在の天然樹脂の数を入力します",
            required: true,
        },{
            type:3,
            name:"通知量",
            description: "通知してほしい樹脂の数を入力します",
            required: true,
        },{
            type:3,
            name:"次の回復",
            description: "次の回復までの時間を分単位で入力します",
            required: false,
        }],

    };



    const score = {
        name: "score",
        description: "聖遺物のスコアを入れてね",
        options:[{
            type:3,
            name:"スコア",
            description: "聖遺物のスコア(サブOPの率✕2+ダメージ+攻撃%)",
            required: true,
        }],

    };

    await client.application.commands.set([jushi,genshintimer,score]);
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
                icon_url: 'https://pbs.twimg.com/media/FcdR7aIaIAE75Uu?format=png&name=large',
                url: 'https://github.com/starkoka/Genshin-Timer',
            },
            description: '原神の様々な通知を行うことができるタイマーbotです\n(よくわからない謎の機能もあります)\n',
            fields: [
                {
                    name: '​\nデイリー通知機能',
                    value: 'デイリーミッションの更新や、週ボスの更新等をお知らせします。\n',
                },
                {
                    name: '​\n樹脂回復通知機能',
                    value: '現在の樹脂と、お知らせしてほしい樹脂の量を指定すると、その値まで樹脂が回復したらお知らせしてくれます。\n',
                },
                {
                    name: '​\nリポップ通知機能',
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
    if (interaction.commandName === 'score') {
        if (interaction.options.getString('スコア') == 33.4  ) {
            await interaction.reply('なんでや！阪神関係ないやろ！');
        }
        else if (interaction.options.getString('スコア') == 44.5  ) {
            await interaction.reply('あてぃし！？');
        }
        else if (interaction.options.getString('スコア') < 30  ) {
            await interaction.reply('スコア'+interaction.options.getString('スコア')+'は流石に経験値にしようか:)');
        }
        else if(interaction.options.getString('スコア') < 40){
            await interaction.reply('スコア'+interaction.options.getString('スコア')+'、時計/杯/冠なら強いんじゃない〜?');
        }
        else if(interaction.options.getString('スコア') < 50){
            await interaction.reply('スコア'+interaction.options.getString('スコア')+'って強くない？');
        }
        else if(interaction.options.getString('スコア') < 60){
            await interaction.reply('スコア'+interaction.options.getString('スコア')+'だとぉ？:face_with_symbols_over_mouth: ふざけるなぁ:sparkler:');
        }
        else if(interaction.options.getString('スコア') < 60.4){
            await interaction.reply('スコア'+interaction.options.getString('スコア')+'ってまじで言ってる？？？え？？？？');
        }
        else if(interaction.options.getString('スコア') < 0){
            await interaction.reply('スコア'+interaction.options.getString('スコア')+'ってなんだよ、負の値じゃんwww');
        }
        else{
            await interaction.reply('スコア'+interaction.options.getString('スコア')+'ってなんだよ、嘘つくな:face_with_symbols_over_mouth:');
        }


    }
    if (interaction.commandName === 'jushi') {
        let second
        if(interaction.options.getString("次の回復")===null){
            second = (interaction.options.getString("通知量")-interaction.options.getString("現在"))*8
        }
        else{
            second = (interaction.options.getString("通知量")-interaction.options.getString("現在"))*8-(8-interaction.options.getString("次の回復"))
        }
        second=second*60*1000
        setTimeout(function (){jushi(interaction.user.id,interaction.options.getString("通知量"),config.notice)},second);
        const enbed = {
            color: 0x27668D,
            title: '樹脂回復通知',
            author: {
                name: 'Genshin-timer',
                icon_url: 'https://pbs.twimg.com/media/FcdR7aIaIAE75Uu?format=png&name=large',
                url: 'https://github.com/starkoka/Genshin-Timer',
            },
            description: `<@!${interaction.user.id}>さん、樹脂が回復したらお知らせします。\n※次回回復までの時刻を指定してない場合、最大8分の誤差があります。`,
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Developed by @kokastar_studio',
                icon_url: 'https://pbs.twimg.com/profile_images/1503219566478229506/0dkJeazd_400x400.jpg',
            },
        };
        await interaction.reply({ embeds: [enbed] })
    }

});

/*樹脂通知の関数*/
function jushi(user,notice,chanel){
    const jushi = {
        color: 0x27668D,
        title: '樹脂回復通知',
        author: {
            name: 'Genshin-timer',
            icon_url: 'https://pbs.twimg.com/media/FcdR7aIaIAE75Uu?format=png&name=large',
            url: 'https://github.com/starkoka/Genshin-Timer',
        },
        description: `<@!${user}>さん、樹脂が${notice}まで回復しました`,
        timestamp: new Date().toISOString(),
        footer: {
            text: 'Developed by @kokastar_studio',
            icon_url: 'https://pbs.twimg.com/profile_images/1503219566478229506/0dkJeazd_400x400.jpg',
        },
    };
    client.channels.cache.get(`${chanel}`).send(`<@!${user}>`)
    client.channels.cache.get(`${chanel}`).send({ embeds: [jushi] })
}

/*毎朝5時のデイリー通知*/
cron.schedule('0 5 * * *', () => {
    const daily = {
        color: 0x27668D,
        title: 'デイリー更新',
        author: {
            name: 'Genshin-timer',
            icon_url: 'https://pbs.twimg.com/media/FcdR7aIaIAE75Uu?format=png&name=large',
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
    if(dayofweek===1){ /*月曜日*/
        const monday = {
            color: 0x27668D,
            title: '新しい週が始まりました',
            description: '新しい週が始まり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '​\n週ボスリセット',
                    value: 'トワリン、アンドリアス、タルタリア、若陀龍王、淑女、雷電将軍の報酬が再度受け取れるようになりました。\nまた、樹脂半減回数がリセットされました。',
                },
                {
                    name: '​\n評判任務更新',
                    value: 'モンド、璃月、稲妻、スメール各国の評判任務が更新されました。\n',
                },
                {
                    name: '​\n「緋紅の願い」リセット',
                    value: 'ドラゴンスパインのクエスト「緋紅の願い」が再挑戦できるようになりました。\n',
                },
                {
                    name: '​\nアイテム購入回数リセット',
                    value: '加工済み食材・洞天百貨宝貨・四方八方の網の購入回数がリセットされました。\n',
                },
                {
                    name: '​\n木材変転回数リセット',
                    value: '木材変転の上限回数がリセットされました。\n',
                },
                {
                    name: '​\n週間限定ギフトパック購入回数リセット',
                    value: '週間限定ギフトパックの購入上限回数がリセットされました。\n',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [monday]})
    }

    if(dayofweek===4){ /*木曜日*/
        const thursday = {
            color: 0x27668D,
            title: '木曜日になりました',
            description: '木曜日になり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '​\n聖遺物購入回数リセット',
                    value: '聖遺物の購入回数上限がリセットされました',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [thursday]})
    }

    if(dayofweek===5){ /*金曜日*/
        const friday = {
            color: 0x27668D,
            title: '金曜日になりました',
            description: '金曜日になり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '​\n「緋紅の願い」リセット',
                    value: 'ドラゴンスパインのクエスト「緋紅の願い」が再挑戦できるようになりました。\n',
                },
                {
                    name: '​\n周回する壺の精霊出現',
                    value: '自分の塵歌壺内で商品を購入可能になりました(日曜日まで)',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [friday]})
    }

    if(dayofweek===6){ /*土曜日*/
        const saturday = {
            color: 0x27668D,
            title: '土曜日になりました',
            description: '土曜日になり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '​\n他人の壺の精霊で購入可能に',
                    value: '他人のの塵歌壺内で商品を購入可能になりました。(日曜日まで)',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [saturday]})
    }
    if(date%3===0){ /*3の倍数の日*/
        const multiple = {
            color: 0x27668D,
            title: 'アイテム購入リセット',
            description: '博来・長順以外の★4以上の食べ物、食材、素材、特産品購入がリセットされました\n\n',
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [multiple]})
    }
    if(date%3===1){ /*3の倍数+1の日*/
        const multiple2 = {
            color: 0x27668D,
            title: 'アイテム購入リセット',
            description: '博来・長順の★4以上の食べ物、食材、素材、特産品購入がリセットされました\n\n',
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [multiple2]})
    }

    if(date===1){ /*毎月1日*/
        const first = {
            color: 0x27668D,
            title: '1日になりました',
            description: '月が変わり、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '​\n螺旋リセット',
                    value: '螺旋9~12層がリセットされました。',
                },
                {
                    name: '​\nスター交換ラインナップ更新・リセット',
                    value: 'スターライト交換のラインナップが更新されました。\nまた、スターライト交換・スターダスト交換の購入回数上限がリセットされました。',
                },
            ],
            timestamp: new Date().toISOString(),
        };
        client.channels.cache.get(config.daily).send({embeds: [first]})
    }
    if(date===16){ /*毎月16日*/
        const sixteenth = {
            color: 0x27668D,
            title: '16日になりました',
            description: '月の後半に入り、以下のものがリセットされました。\n\n',
            fields: [
                {
                    name: '​\n螺旋リセット',
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
