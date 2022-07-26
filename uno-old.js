const prefix = ";";
const Discord = require("discord.js");
const client = new Discord.Client();
const url_card = "https://cdn.discordapp.com/attachments/834337566920146954/834337612096733187/";
const pong = ["https://tenor.com/view/discord-ping-pingus-bingus-cat-gif-18905873", "https://tenor.com/view/whopinged-ping-discord-gif-20798307", "https://i.kym-cdn.com/photos/images/newsfeed/000/753/601/bc8.gif", "https://i.imgur.com/pzpv7iF.gif", "https://media1.tenor.com/images/17d07aa788bebd1204afc66fa5b4a6b4/tenor.gif?itemid=19386667", "https://tenor.com/view/ping-ping-everyone-ping-me-rage-ping-gif-19684122"]
var card = ["+4", "color"]
setcard("r");
setcard("y");
setcard("g");
setcard("b");
function setcard(color) {
   for (let i = 0; i <= 9; i++) {
      card.push(color + i);
   }
   card.push(color + "+2");
   card.push(color + "rev");
   card.push(color + "block");
}
var game = [];

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

function strRemove(a, c) {
   a = a.split("")
   a.cut(c)
   return a.join("")
};


function Player(member, cards) {
   this.id = member;
   this.cards = cards;
}

client.on('ready', () => {
   console.log(`Zalogowano jako ${client.user.tag}!`);
});

client.on('message', message => {
   if (message.content == "<@!833011372001460244>") {
      message.reply("take a pong!")
      message.channel.send(pong[Math.floor(Math.random() * pong.length)])
   }
   if (message.content.indexOf(prefix) !== 0) return;
   var args = message.content.slice(prefix.length).trim().split(/ +/g);
   var com = args.shift().toLowerCase()

   function sendto(mes) { return message.channel.send(mes) }

   switch (com) {
      case "ping":
         message.reply("take a pong!")
         message.channel.send(pong[Math.floor(Math.random() * pong.length)])
         break;
      case "t":
      case "test":
         sendto("Na co zmienić tą wiadomość?")
         filter = m => m.author.id === message.author.id
         message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
            message.channel.messages.fetch({ limit: 2 }).then(messages => {
               messages.first().delete()
               messages.last().edit(collected.first().content);
            }).catch(console.error);
         })
         break;
      case "p":
      case "play":
         var url = "https://discord.com/channels/@me/" + message.channel.id;
         function cardlist(game, who) {
            const embed = new Discord.MessageEmbed()
               .setTitle("Your cards [" + game[who].cards.length + "]")
               .setDescription((game[who].cards).sort())
               .addField("Back to channel", `[click here](${url})`)
            return client.users.cache.find(user => user.id === players[who]).send(embed)
         }

         const filter = m => m.author.id === message.author.id;
         if (message.member.voice.channel == null) {
            return message.reply("You aren't on the voice channel!")
         }
         var players = message.member.voice.channel.members.map(member => member.id);
         let players_now = "";
         players.forEach(cut)
         function cut(item) {
            players_now += "<@!" + item + "> "
         }

         sendto(`Are everyone on the voice channel participating in the game? If someone doesn't want to participate, ping them. The same if someone else wants to play\nNow in game are: ${players_now}\nuse \`start\` if everything is correct\n**Don't use prefix or command! Just ping**`)
         message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
            if (collected.first().content != "start") {
               var collect = collected.first().content.trim().split(/ +/g);
               let colect = [];
               collect.forEach(cut)
               function cut(item) {
                  if (item.startsWith("\n")) { colect.push(item.slice(4, -1)) }
                  else { colect.push(item.slice(3, -1)) }
               }
               collect = colect;
               for (let i = 0; i < collect.length; i++) {
                  if (players.includes(collect[i])) {
                     players.cut(collect[i])
                  }
                  else {
                     players.push(collect[i])
                  }
               }
            }

            var [now, idle, end, next] = [0, 1, false, 1];

            var card_now = card[Math.floor(Math.random() * card.length)]
            while (card_now.includes("+") || card_now.includes("rev") || card_now.includes("block") || card_now == "color") {
               card_now = card[Math.floor(Math.random() * card.length)]
            }

            for (let s = 0; s < message.member.voice.channel.members.size; s++) {
            }
            for (let i = 0; i < players.length; i++) {
               let c = [];
               for (let l = 0; l < 7; l++) {
                  c.push(card[Math.floor(Math.random() * card.length)])
               }
               game.push(new Player(players[i], c))
            };
            for (let i = 0; i < players.length; i++) {
               cardlist(game, i)
            }

            sendto("All players have own cards on PV");
            sendto(`The player starts: <@!${players[0]}>[${game[now%players.length].cards.length}]\nuse: \`draw\` to take a card\nStarting card: ${card_now}`)
            //sendto(url_card+card_now+".png");
            
            play()
            function play() {
               

               var filtr = m => m.author.id === game[now%players.length].id
               message.channel.awaitMessages(filtr, { max: 1, time: 999999999 }).then(collected => {
                  let content = collected.first().content
                  collected.first().content = ""
                  if (content == "draw") {
                     game[now%players.length].cards.push(card[Math.floor(Math.random() * card.length)]).sort

                     sendto(`Player now: <@!${game[next%players.length].id}>[${game[now%players.length].cards.length}]\nuse: \`draw\` to take a card\nCard now: ${card_now}`);

                     cardlist(game, now%players.length)

                     now += idle
                     next = now + idle
                     return play()
                  }
                  else if ((game[now%players.length].cards).includes(content)) {
                     if (game[now%players.length].cards.length == 1) {
                        return end = true;
                     }
                     if (content == "+4" || content == "color" || content.slice(0, 1) == card_now.slice(0, 1) || content.slice(1) == card_now.slice(1)) {

                        if (content == "+4" || content == "color") {
                           sendto(`<@!${game[now%players.length]}> color?\n\`y\` \`r\` \`g\` \`b\``)
                           message.channel.awaitMessages(filtr, { max: 1, time: 999999999 }).then(collected => {
                              game[now%players.length].cards.cut(content)
                              content = collected.first().content + content
                              card_now = content
                              content = "";

                              sendto(`Player now: <@!${game[next%players.length].id}>[${game[now%players.length].cards.length}]\nuse: \`draw\` to take a card\nCard now: ${card_now}`);

                              cardlist(game, now%players.length)

                              now += idle
                              next = now + idle
                              return play()
                           });
                        }
                        else {
                           if (content == "+4" || content.slice(1) == "+2") {
                              for (let c = 0; c < parseInt(content.slice(-1)); c++) {
                                 game[next%players.length].cards.push(card[Math.floor(Math.random() * card.length)]).sort
                              }
                              cardlist(game, next%players.length)
                           }
                           if (content.slice(1) == "rev") {
                              idle *= -1
                           }
                           if (content == "+4" || content.slice(1) == "+2" || content.slice(1) == "block") {
                              next += idle
                           }

                           card_now = content
                           game[now%players.length].cards.cut(content)
                           content = "";

                           sendto(`Player now: <@!${game[next%players.length].id}>[${game[now%players.length].cards.length}]\nuse: \`draw\` to take a card\nCard now: ${card_now%players.length}`);

                           cardlist(game, now%players.length)

                           now += idle
                           next = now + idle
                           return play()
                        }
                     }
                     else {
                        client.users.cache.find(user => user.id === players[now%players.length]).send("You can't use this card!")
                        return play()
                     }
                  }
                  else {
                     client.users.cache.find(user => user.id === players[now%players.length]).send("You don't have this card or card don't exist!")
                     return play()
                  }
               })
            }
         })
         break;
      case "help":

         break;
      default:
         message.author.send("Use `" + prefix + "help`, pls")
         break;
   }
});

client.login("");