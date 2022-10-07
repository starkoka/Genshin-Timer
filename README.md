# Genshin-Timer Discord BOT
DiscordBOT for Genshin that notifies resin recovery and repop time.  
(Japanese only now.English will be available in the future.)

原神の樹脂の回復や、リポップの時間をお知らせしてくれるタイマーBOTです。  
日本語の説明は英語の説明の下にあります。  

**Repop time notification function is currently not implemented.  
リポップ時間通知機能は現在未実装です。**

Copyright (c) 2022 kokastar  
Released under the MIT license/MITライセンスのもとで公開  

## Introduction Method
1.Install node.js(more than v16) and npm.

2.Place clone this repository on your server.  
```
git clone https://github.com/starkoka/Genshin-Timer.git
```

3.Go to bot-main and click and Install package using npm install.
```
npm install
```
4.Create a config.json file. Then edit it as follows  
```js:config.json
{
  "token": "your bot token",
  "daily": "ID of the channel for which you want to receive daily notifications",
  "notice": "ID of the channel for which you want to receive resin recovery notifications"
"
}
```
5.Execute the following command to start the bot
```
node genshintimer.js
```

## 導入方法
1.node.js(v16以上)及びnpmをインストールしてください 

2.このリポジトリをBOTを運用するサーバーにクローンしてください
```
git clone https://github.com/starkoka/Genshin-Timer.git
```

3.bot-mainに移動した後、npm installで、パッケージをインストールしてください
```
npm install
```
4.config.jsonを作成してください。そして、以下の通りに編集してください
```javascript:config.json
{
  "token": "botのトークン"
  "daily":"デイリー通知を受け取るチャンネルのID"
  "notice": "樹脂回収通知を受け取りたいチャンネルのID"
}
```
5.以下のコマンドを実行すると、botが起動します
```
node genshintimer.js
```
