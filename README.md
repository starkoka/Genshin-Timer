# Genshin-Timer Discord BOT
DiscordBOT for Genshin that notifies resin recovery and repop time.  

原神の樹脂の回復や、リポップの時間をお知らせしてくれるタイマーBOTです。  
日本語の説明は英語の説明の下にあります。  

**This BOT is currently under development. It is not available.  
このBOTは現在開発中です。使用できません。**

## Introduction Method
1.Install node.js.  
2.Install init.node-cron and discord.js using npm.  
3.Place this file on your server.  
4.Create a config.json file. Then edit it as follows  
```js:config.json
{
  "prefix": "!",
  "token": "your bot token"
  "daily": "ID of the channel for which you want to receive daily notifications"
}
```
5.Execute the following command.
```
node index.js
```

## 導入方法
1.node.jsをインストールしてください  
2.npmを使用して、initとnode-cron、それにdiscord.jsをインストールしてください  
3.このファイルをサーバーに配置してください   
4.config.jsonを作成してください。そして、以下の通りに編集してください
```javascript:config.json
{
  "prefix": "!",
  "token": "botのトークン"
  "daily":"デイリー通知を受け取るチャンネルのID"
}
```
5.以下のコマンドを実行してください。
```
node index.js
```
