const botconfig = require("./botconfig.json");
const prefix = botconfig.prefix
const version = "0.1.0"
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`${client.user.tag}: ✅!`);
});

client.on('message', message => {
  if (message.content.indexOf(prefix) !== 0) return;
  let lang = message.channel.guild.preferredLocale
  const msg_lang = require("./lang.json")
  var msg = msg_lang.lang[msg_lang.langs.indexOf(lang)]

  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  var com = args.shift().toLowerCase()

  function sendto(mes) { return message.channel.send(mes) }

  switch (com){

    case "setlang":
      if(args != undefined && msg_lang.langs.includes(args[0])){
        message.channel.guild.preferredLocale = args[0]
        let change_lang = message.channel.guild.preferredLocale
        msg = msg_lang.lang[msg_lang.langs.indexOf(change_lang)]
        sendto(msg.change_lang)
      }
      else{
        sendto(msg.no_suport_lang + msg_lang.langs)
      }
      break;

    case "test":
      sendto(msg.test)
      break;

    case "help":
      sendto(msg.help)
      break;

    default:
      sendto(msg.idk_kom)
      break;
  }

});

client.login(botconfig.token);


//funkcion++


Array.prototype.cut = function () {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
      break;
    }
  }
  return this;
};
Array.prototype.remove = function () {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
/*
String.prototype.remove = function(){
  var arr = this.split("");
  var a = arguments, L = a.length;
  while (L && this.length){
    arr.cut(a[--L]);
    this = arr;
  }
  return this;
};
String.prototype.cut = function(){
  var arr = this.split("");
  var a = arguments, L = a.length;
  while (L && this.length){
    arr.cut(a[--L]);
    this = arr;
    break;
  }
  return this;
};*/