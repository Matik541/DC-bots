const config = require("./config.json");
const Discord = require("discord.js");
const client = new Discord.Client();

const figures = [
   new Map([
      ['r', '<:0r:840097656344412181>'],
      ['n', '<:0n:840097656588075049>'],
      ['b', '<:0b:840097656361844757>'],
      ['q', '<:0q:840097656285298689>'],
      ['k', '<:0k:840097656427511808>'],
      ['p', '<:0p:840100212986216468>']
   ]),
   new Map([
      ['r', '<:1r:840097656390811688>'],
      ['n', '<:1n:840097656047140946>'],
      ['b', '<:1b:840097656420040764>'],
      ['q', '<:1q:840097656461066270>'],
      ['k', '<:1k:840097656135090208>'],
      ['p', '<:1p:840097656428822548>']
   ])
]

const characters = ["a", "b", "c", "d", "e", "f", "g", "h"];
function ascii(value) {
   if (typeof (value) == 'number') {
      return characters[value]
   }
   if (characters.includes(value)) {
      return characters.indexOf(value)
   }
   return;
}
let bg = new Map()
let color = 0
for (let l = 3; l <= 6; l++) {
   for (let i = 0; i < 8; i++) {
      bg.set(`${l}${ascii(i)}`, color % 2)
      color++
   }
   color++
}

const moves = new Map([
   ['r', ['0_', '_0']],
   ['n', ['12', '21', '19']],
   ['b', ['__']],
   ['q', ['0_', '__', '_0']],
   ['k', ['11', '10', '1', '9']],
   ['p', ['10']]
])

client.on('ready', () => {
   console.log('Login as ' + client.user.tag);
});

client.on('message', msg => {
   if (msg.content.indexOf(config.prefix) !== 0) return;
   var args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
   var com = args.shift().toLowerCase()

   function sendTo(mes) { return msg.channel.send(mes) }

   function sendError(mes) { return msg.channel.send('`\``diff\n- ' + mes + '`\``') }
   function sendWarn(mes) { return msg.channel.send('`\``fix\n! ' + mes + '`\``') }
   function sendAcces(mes) { return msg.channel.send('`\``diff\n+ ' + mes + '`\``') }

   switch (com) {
      
      /* Głosowania :v
      case "vote":
         let votes = [
            '',
            '1️⃣',
            '2️⃣',
            '3️⃣',
            '4️⃣',
            '5️⃣',
            '6️⃣',
            '7️⃣',
            '8️⃣',
            '9️⃣'
         ]
         const vote = new Discord.MessageEmbed()
            .setTitle(args[0])
            .setColor('green')
         for (let v = 1; v < args.length; v++) {
            vote.addField(votes[v], ` [${args[v].split('/')[2].split('.')[1]}](${args[v]})`)
         }
         sendTo(vote).then(
            embedMessage => {
               for (let v = 1; v < args.length; v++) {
                  embedMessage.react(votes[v])
               }
            });
         break;
      */
      case "test":
         sendTo('send to chanel');
         sendError('Error');
         sendWarn('Warn');
         sendAcces('Acces');
         break;
      case "p":
         const chees = new Map([ // 
            ['8a', figures[0].get('r')],
            ['8b', figures[0].get('n')],
            ['8c', figures[0].get('b')],
            ['8d', figures[0].get('q')],
            ['8e', figures[0].get('k')],
            ['8f', figures[0].get('b')],
            ['8g', figures[0].get('n')],
            ['8h', figures[0].get('r')],
         ]);

         for (let j = 0; j < 8; j++) {
            chees.set(7 + ascii(j), figures[0].get('p'))
         }

         for (let j = 0; j < 8; j++) {
            chees.set(2 + ascii(j), figures[1].get('p'))
         }

         {
            chees.set('1a', figures[1].get('r'));
            chees.set('1b', figures[1].get('n'));
            chees.set('1c', figures[1].get('b'));
            chees.set('1d', figures[1].get('q'));
            chees.set('1e', figures[1].get('k'));
            chees.set('1f', figures[1].get('b'));
            chees.set('1g', figures[1].get('n'));
            chees.set('1h', figures[1].get('r'));
         }
         sendTo('z kim chcesz zagrać? Znacz tą osobę, np. `@dummy`\n **nie używaj config.prefixu!**')
         var filtr = m => m.author.id === msg.author.id
         msg.channel.awaitMessages(filtr, { max: 1, time: 999999999 }).then(collected => {
            let content = collected.first().content;
            collected.first().content = "";
            if (!content.startsWith('<@!')) {
               return sendWarn('Nie oznczyłeś osoby z którą chcesz zagrać');
            };

            var game = {
               end: false,
               players: new Map([
                  [msg.author.id, [
                     '1a', '1b', '1c', '1d', '1e', '1f', '1g', '1h',
                     '2a', '2b', '2c', '2d', '2e', '2f', '2g', '2h',
                  ]],
                  ['476128485723865101', [
                     '8a', '8b', '8c', '8d', '8e', '8f', '8g', '8h',
                     '7a', '7b', '7c', '7d', '7e', '7f', '7g', '7h',
                  ]]
               ]),
               player: [msg.author.id, content.slice(3, -1)],
               play: '',
               now: 10
            }

            var chess = bg;
            for (const [key, value] of chees) {
               chess.set(key, value)
            }
            chess = new Map([...chess.entries()].sort());

            var board = ':blue_square::regional_indicator_a::regional_indicator_b::regional_indicator_c::regional_indicator_d::regional_indicator_e::regional_indicator_f::regional_indicator_g::regional_indicator_h:\n:one:';
            let tile, color = 1, numbers = [':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ''], num = 0;
            for (const exit of chess.values()) {
               tile = exit
               if (exit == 1) { tile = ':white_large_square:' }
               if (exit == 0) { tile = ':black_large_square:' }
               board += tile;
               if (color % 8 == 0) { board += '\n' + numbers[num]; num++ }
               color++
            }


            msg.channel.send(board);
            msg.channel.send('użyj `pole figury` i `nowe pole`\nnp: `2a 3a`');
            game.play = setInterval(() => {
               if (game.end) { return game.play.clearInterval() }
               filtr = m => m.author.id === game.player[game.now % 2]
               msg.channel.awaitMessages(filtr, { max: 1, time: 999999999 }).then(collected => {
                  content = collected.first().content;
                  collected.first().content = "";
                  if (content != '') {
                     content = content.toLowerCase().trim().split(" ");
                     var moveFrom = '-', moveTo = '|';

                     if (content[0] == undefined) { return sendError('Nie podano argumentów'); }
                     if (content[1] == undefined) { return sendError('Nie podano drugiego argumentu'); }

                     if (content[0].slice(0, 1) * 1 > 0 && content[0].slice(0, 1) * 1 < 9 && characters.includes(content[0].slice(1, 2))) {
                        moveFrom = content[0]
                     }
                     else if (content[0].slice(1, 2) * 1 > 0 && content[0].slice(1, 2) * 1 < 9 && characters.includes(content[0].slice(0, 1))) {
                        moveFrom = content[0].slice(1, 2) + content[0].slice(0, 1)
                     }
                     else { return; }

                     if (content[1].slice(0, 1) * 1 > 0 && content[1].slice(0, 1) * 1 < 9 && characters.includes(content[1].slice(1, 2))) {
                        moveTo = content[1]
                     }
                     else if (content[1].slice(1, 2) * 1 > 0 && content[1].slice(1, 2) * 1 < 9 && characters.includes(content[1].slice(0, 1))) {
                        moveTo = content[1].slice(1, 2) + content[1].slice(0, 1)
                     }
                     else { return; }

                     if (moveTo == moveFrom) { return sendWarn('Nie można wykonać ruchu w to samo miejsce'); }
                     if (!game.players.get(collected.first().author.id).includes(moveFrom)) { return sendWarn('Nie masz na tym polu swojej figury') }

                     var move = moves.get(chees.get(moveFrom).slice(3, 4)), moved, moveF = (moveFrom.slice(0, 1) + ascii(moveFrom.slice(1, 2))) * 1, moveT = (moveTo.slice(0, 1) + ascii(moveTo.slice(1, 2))) * 1

                     if (moveF > moveT) {
                        moved = moveF - moveT;
                     }
                     else {
                        moved = moveT - moveF;
                     }

                     console.log(moveF, moveT, moved)

                     moved = moved.toString()

                     if (!move.includes(moved)) {
                        let figure = new Map([
                           ['p', 'Pion'],
                           ['r', 'Wieża'],
                           ['n', 'Skoczek'],
                           ['b', 'Goniec'],
                           ['q', 'Hetman'],
                           ['k', 'Król']
                        ])
                        return sendWarn(`${figure.get(chees.get(moveFrom).slice(3, 4))} z pola ${moveFrom} nie może wykonać ruchu na ${moveTo}`);
                     }

                     game.players.get(game.player[game.now % 2])[game.players.get(game.player[game.now % 2]).indexOf(moveFrom)]
                     game.players.get(game.player[game.now % 2]).push(moveTo)

                     let moveFigure = figures[(game.now + 1) % 2].get(chees.get(moveFrom).slice(3, 4))
                     chees.set(moveTo, moveFigure)

                     bg = new Map()
                     let tilecolor = 0
                     for (let l = 1; l <= 8; l++) {
                        for (let i = 0; i < 8; i++) {
                           bg.set(`${l}${ascii(i)}`, tilecolor % 2)
                           tilecolor++
                        }
                        tilecolor++
                     }
                     var chess = bg;

                     for (const [key, value] of chees) {
                        chess.set(key, value)
                     }
                     chesss = new Map([...chess.entries()].sort());

                     var board = ':blue_square::regional_indicator_a::regional_indicator_b::regional_indicator_c::regional_indicator_d::regional_indicator_e::regional_indicator_f::regional_indicator_g::regional_indicator_h:\n:one:';
                     let tile, color = 1, numbers = [':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ''], num = 0;
                     for (const exit of chesss.values()) {
                        tile = exit
                        if (exit == 1) { tile = ':white_large_square:' }
                        if (exit == 0) { tile = ':black_large_square:' }
                        board += tile;
                        if (color % 8 == 0) { board += '\n' + numbers[num]; num++ }
                        color++
                     }

                     game.now++
                     msg.channel.send(board);
                  }
               });
            }, 500);
         });
         break;
   }
});

client.login(config.token);