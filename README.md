# Genshin-Timer Discord BOT
DiscordBOT for Genshin that notifies resin recovery and repop time.  

原神の樹脂の回復や、リポップの時間をお知らせしてくれるタイマーBOTです。  
日本語の説明は英語の説明の下にあります。  



## Introduction Method
1.Install node.js.  
2.Install init and node-cron using nmp.  
3.Place this file on your server.  
4.Create a config.json file. Then edit it as follows  
```js:config.json
{
    "BOT_TOKEN": "YOUR BOT TOKEN"
}
```
5.create a config.txt file. Then edit it as follows
```txt:config.txt
daily="ID to which daily notifications are sent"
alarm="ID to which alarm notifications are sent"
```

## 導入方法
1.node.jsをインストールしてください  
2.nmpを使用して、initとnode-cronをインストールしてください  
3.このファイルをサーバーに配置してください   
4.config.jsonを作成してください。そして、以下の通りに編集してください
```javascript:config.json
{
    "BOT_TOKEN": "botのトークンをここに入れてください"
}
```
5.config.txtを作成してください。そして、以下のとおりに編集してください。
```txt:config.txt
daily="デイリー通知の送信先ID"
alarm="アラーム通知の送信先ID"
```