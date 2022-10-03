# Genshin-Timer Discord BOT
DiscordBOT for Genshin that notifies resin recovery and repop time.  
(Japanese only now.English will be available in the future.)

原神の樹脂の回復や、リポップの時間をお知らせしてくれるタイマーBOTです。  
日本語の説明は英語の説明の下にあります。  

**Currently only the daily notification function is implemented.  
現在はデイリー通知機能のみ実装されています。**

Copyright (c) 2022 kokastar  
Released under the MIT license/MITライセンスのもとで公開  

## Introduction Method
1.Install node.js.  
2.Install init,date-utils,node-cron and discord.js using npm.  
3.Place clone this repository on your server.  
```
git clone https://github.com/starkoka/Genshin-Timer.git
```
4.Create a config.json file. Then edit it as follows  
```js:config.json
{
  "token": "your bot token"
  "server": "ID of the server to be added"
  "daily": "ID of the channel for which you want to receive daily notifications"
}
```
5.Execute the following command.
```
node genshintimer.js
```

## 導入方法
1.node.jsをインストールしてください  
2.npmを使用して、init、date-utils、node-cron、それにdiscord.jsをインストールしてください  
3.このリポジトリをBOTを運用するサーバーにクローンしてください
```
git clone https://github.com/starkoka/Genshin-Timer.git
```
4.config.jsonを作成してください。そして、以下の通りに編集してください
```javascript:config.json
{
  "token": "botのトークン"
  "server": "追加するサーバーのID"
  "daily":"デイリー通知を受け取るチャンネルのID"
}
```
5.以下のコマンドを実行してください。
```
node genshintimer.js
```
