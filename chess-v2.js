const Discord = require('discord.js')
const { ASCII } = require('mysql/lib/protocol/constants/charsets')
const { token } = require('./config.json')
const client = new Discord.Client()

const prefix = ';'

client.on('ready', () => {
  console.log('CHESS is ready to play!')
})

client.on('message', (msg) => {

  function send(message) {
    msg.channel.send(message)
  }
  function warn(message) {
    msg.channel.send('```fix\n!' + message + '```')
  }

  if (msg.author.bot || !msg.content.startsWith(prefix)) return
  var args = msg.content.trim().split(/ +/g)
  var command = args[0].split(';')[1]
  args.shift()

  if (command == 'chess') {
    if (!args[0].match(/^<@!.*>$/)) {
      return send('Who do you want to play with?\nuse: `;chees @name`')
    }
    // if (args[0].slice(3, -1) == msg.author.id) {
    //   return send('You can\'t play with yourself');
    // }
    const pieces = new Map()

    pieces.set('0k', ['<:0k:840097656427511808>', 0]) // black king
    pieces.set('0q', ['<:0q:840097656285298689>', 9]) // black queen
    pieces.set('0r', ['<:0r:840097656344412181>', 5]) // black rook
    pieces.set('0b', ['<:0b:840097656361844757>', 3]) // black bishop 
    pieces.set('0n', ['<:0n:840097656588075049>', 3]) // black knight
    pieces.set('0p', ['<:0p:840100212986216468>', 1]) // black pawn

    pieces.set('1k', ['<:1k:840097656135090208>', 0]) // white king
    pieces.set('1q', ['<:1q:840097656461066270>', 9]) // white queen
    pieces.set('1r', ['<:1r:840097656390811688>', 5]) // white rook
    pieces.set('1b', ['<:1b:840097656420040764>', 3]) // white bishop
    pieces.set('1n', ['<:1n:840097656047140946>', 3]) // white knight
    pieces.set('1p', ['<:1p:840097656428822548>', 1]) // white pawn

    players = [[msg.author.id, 0, []], [args[0].slice(3, -1), 0, []]]
    send('Ready to play?')

    var board = []
    for (let y = 7; y >= 0; y--) {
      let fill = []
      fill.length = 8;
      board.push(fill);
    }

    board[0] = ['0r', '0n', '0b', '0k', '0q', '0b', '0n', '0r']
    board[1] = ['0p', '0p', '0p', '0p', '0p', '0p', '0p', '0p']
    board[6] = ['1p', '1p', '1p', '1p', '1p', '1p', '1p', '1p']
    board[7] = ['1r', '1n', '1b', '1k', '1q', '1b', '1n', '1r']

    function display() {
      let boardbg = [':blue_square::regional_indicator_a::regional_indicator_b::regional_indicator_c::regional_indicator_d::regional_indicator_e::regional_indicator_f::regional_indicator_g::regional_indicator_h:'];
      for (let y = 0; y < 8; y++) {
        let numbers = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:'];
        let fill = [numbers[((y * -1) + 7)]];
        for (let x = 0; x < 8; x++) {
          fill += (board[y][x] != undefined) ? (pieces.get(board[y][x])[0]) : (((x - y) % 2 == 0) ? ':black_large_square:' : ':white_large_square:')
        }
        boardbg.push(fill);
      }
      return send(boardbg);
    }
    display();
    send('Moves (eg.): `D2 D3` move pawn 1 forward, `B8 C6` move knight to `C6`, etc.')
    play(players[1], 1)

    async function play(player, n) {
      console.log(player, n);
      send('Now playing <@!' + player[0] + '>');
      let filter = m => m.author.id == player[0];
      const collector = msg.channel.createMessageCollector(filter, { time: 999999 });

      collector.on('end', m => {
        console.log('kys');
      })

      collector.on('collect', m => {
        arg = m.content.toLowerCase().trim().split(/ +/g)
        console.log(arg)
        if (arg.length < 2) {
          warn('You must specify two position, first selecting pawn, and second selecting where pawn should be moved');
        }
        else if (arg[0].length > 2 || arg[1].length > 2 || arg[0].length < 2 || arg[1].length < 2) {
          warn('Wrong declarations!');
        }
        else {
          let move = [[(arg[0][1] * -1) + 8, arg[0][0].charCodeAt(0) - 97], [(arg[1][1] * -1) + 8, arg[1][0].charCodeAt(0) - 97]];

          if ((board[move[0][0]][move[0][1]]) == undefined) {
            warn('There is no pawn!');
          }
          else if ((board[move[1][0]][move[1][1]]) != undefined && (board[move[1][0]][move[1][1]])[0] == (n) % 2) {
            warn('You cannot move pawn on this spot!');
          }
          else if (move[1][0] > 7 || move[1][0] < 0 || move[1][1] > 7 || move[1][1] < 0) {
            warn('You cannot move pawn outside board!');
          }
          else if ((board[move[0][0]][move[0][1]])[0] == (n) % 2) {

            let newMove = [((move[0][0] > move[1][0]) ? (move[0][0] - move[1][0]) : (move[1][0] - move[0][0])), ((move[0][1] > move[1][1]) ? (move[0][1] - move[1][1]) : (move[1][1] - move[0][1]))]

            let can = false;

            where = (board[move[1][0]][move[1][1]] == undefined) ? (true) : ((board[move[1][0]][move[1][1]])[0] == (n) % 2)

            switch (board[move[0][0]][move[0][1]][1]) {
              case 'p':
                if ((board[move[1][0]][move[1][1]] == undefined) ? (newMove[0] == 1 && newMove[1] == 0) : ((board[move[1][0]][move[1][1]])[0] == (n) % 2) && newMove[0] == 1 && newMove[1] == 1) {
                  console.log('pawn!')
                  can = true
                }
                break;
              case 'n':
                if ((newMove[0] == 2 && newMove[1] == 1) || (newMove[0] == 1 && newMove[1] == 2) && where) {
                  console.log('knight!')
                  can = true
                }
                break;

              case 'k':
                if ((newMove[0] == 0 && newMove[1] == 1) || (newMove[0] == 1 && newMove[1] == 0) || (newMove[0] == 1 && newMove[1] == 1) && where) {
                  console.log('king!')
                  can = true
                }
                break;

              case 'b':
                if ((newMove[0] == newMove[1] && newMove[0] > 0) && where) {
                  console.log('bishop!')
                  can = true
                }
                break;

              case 'r':
                if (((newMove[0] == 0 && newMove[0] > 0) || (newMove[0] > 0 && newMove[0] == 0)) && where) {
                  console.log('rook!')
                  can = true
                }
                break;
              case 'q':
                if (((newMove[0] == 0 && newMove[0] > 0) || (newMove[0] > 0 && newMove[0] == 0) || (newMove[0] == newMove[1] && newMove[0] > 0)) && where) {
                  console.log('queen!')
                  can = true
                }
                break;
              default:
                console.log('unknown')
                break;
            }

            if (can) {
              if ((board[move[1][0]][move[1][1]] != undefined) ? (board[move[1][0]][move[1][1]][0] == (n + 1) % 2) : false && board[move[1][0]][move[1][1]][1] == 'k') { send('you capture: ' + pieces.get(board[move[1][0]][move[1][1]])[0] + ' **+' + pieces.get(board[move[1][0]][move[1][1]])[1] + '** point!') }

              // send('GG (failure conditions)');
              console.log('move')

              board[move[1][0]][move[1][1]] = board[move[0][0]][move[0][1]]
              board[move[0][0]][move[0][1]] = undefined;
              display()
              n += 1
            }
            else {
              warn('You cannot do that move!')
            }
          }
          else {
            return warn('There is not your pawn!');
          }
        }
        collector.stop()
        play((players[n % 2]), (n % 2))
      })
    }
  }

  if (command == 'kill' && msg.author.id == '497072910670757949') { kill() }
})

client.login(token)
