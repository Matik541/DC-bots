const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const { Console } = require("console");
const prefix = botconfig.prefix
const nazwabota = "Discord-Man"
const wersja = "0.1.0"
const bot = new Discord.Client({ disableEveryone: true })

var AstarMap = []

bot.on("ready", async () => {
  bot.user.setActivity("'pomoc")
  var long = "━"
  console.log(`┏${long.repeat(nazwabota.length + 9)}┓\n┃${nazwabota} : online┃\n┗${long.repeat(nazwabota.length + 9)}┛`)
});

bot.on("message", async message => {
  if (message.content.indexOf(prefix) !== 0) return;
  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  var com = args.shift().toLowerCase()

  function send(mes) { return message.channel.send(mes) }

  if (com == "pomoc") {
    const embed1 = new Discord.MessageEmbed()
      .setTitle("Pomoc")
      .setDescription("Wszystkie porady co do gry i jak grać")
      .addField("`'p` lub `'play`", "zaczyna grę\nmożna użuć również `p <color>`, wtedy plansza gry ma wybrany kolor\n*Lista kolorów*\n> :red_square: `czerwony` `red` \n> :orange_square: `pomarańczowy` `orange`  \n> :yellow_square: `żółty` `yellow` \n> :green_square: `zielony` `green` \n> :blue_square: `niebieski` `blue` \n> :purple_square: `fioletowy` `purple`")
      .addField("**O grze**", "*Duchy*\n> :rage: 1/ruch, ciągle śledzi gracza, pojawia się w 10 ruchu\n> :cold_face: 0,5/ruch, podąża za graczem, pojawia się w 5 ruchu\n> :nauseated_face: 1/ruch, porusza się po planszy odbijając się od ścian, pojawia się w 1 ruchu\n\n*Do wygranje*\n> zbierz wszystkie punkty i nie daj się zabić")
      .addField("`'pomoc`", "wyświetla tą liste")
      .addField("cokolwiek zaczynającego się na `'`", "bot cię zwyzywa że go pingujesz")
      .addField("**Dodaj bota na swój serwer**", "[[kliknij]](https://discord.com/api/oauth2/authorize?client_id=777984780825395242&permissions=1074089024&scope=bot)")
      .addField("**Kontakt z twórcą**", "[Matik#3124](https://discord.com/users/497072910670757949)\n[O twórcy](https://mateuszkowalski.000webhostapp.com/index.html#me)")
      .setColor("#2299ff")

    return message.author.send(embed1)
  }
  else if (com == "play" || com == "p") {
    switch (args[0]) { //kolorki
      case "czerwony":
      case "red":
      case ":red_square:":
        var wall = ":red_square:"
        break;
      case "pomarańczowy":
      case ":orange_square:":
      case "orange":
        var wall = ":orange_square:"
        break;
      case "żółty":
      case "yellow":
      case ":yellow_square:":
        var wall = ":yellow_square:"
        break;
      case "zielony":
      case "green":
      case ":green_square:":
        var wall = ":green_square:"
        break;
      case "niebieski":
      case "blue":
      case ":blue_square:":
        var wall = ":blue_square:"
        break;
      case "fioletowy":
      case "purple":
      case ":purple_square:":
        var wall = ":purple_square:"
        break;
      default:
        let walls = [":red_square:", ":orange_square:", ":yellow_square:", ":green_square:", ":blue_square:", ":purple_square:"]
        var wall = walls[Math.floor(Math.random() * walls.length)]
        break;
    }
    const filter = m => m.author.id === message.author.id;
    const characterEmbed = new Discord.MessageEmbed()
      .setTitle("Wybież swoją postać")
      .setDescription("wyślij emoji którym chcesz zagrać")
      .setFooter("*(nie używaj prefix'u!)*")
      .setColor("2299ff")
    send(characterEmbed)
    message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
      send("twoja postać: " + collected.first().content)
      const [gate, tp, coin, no_coin, character] = [":white_square_button:", ":black_square_button:", ":white_small_square:", ":black_small_square:", collected.first().content]
      var [end, score, moved, moves, move, dp, player, ghost0, ghost1, ghost2, gh2_x, gh2_y] = [false, 0, false, 0, 0, [], new Pl(character), new Gh(0), new Gh(1), new Gh(2), ([-1, 1])[Math.floor(Math.random() * 2)], 0]
      const grid = [
        wall, wall, wall, tp, wall, wall, wall, wall, wall, tp, wall, wall, wall, "\n",
        wall, "", "", "", wall, "", "", "", wall, "", "", "", wall, "\n",
        wall, "", wall, "", wall, "", wall, "", wall, "", wall, "", wall, "\n",
        wall, "", "", "", "", "", wall, "", "", "", "", "", wall, "\n",
        wall, "", wall, wall, wall, "", wall, "", wall, wall, wall, "", wall, "\n",
        wall, "", "", "", "", "", "", "", "", "", "", "", wall, "\n",
        wall, "", wall, wall, wall, wall, gate, wall, wall, "", wall, wall, wall, "\n",
        tp, "", "", "", wall, new Gh(0), new Gh(1), new Gh(2), wall, "", "", "", tp, "\n",
        wall, wall, wall, "", wall, wall, wall, wall, wall, wall, wall, "", wall, "\n",
        wall, "", "", "", "", "", new Pl(character), "", "", "", "", "", wall, "\n",
        wall, "", wall, wall, wall, "", wall, "", wall, wall, wall, "", wall, "\n",
        wall, "", "", "", "", "", wall, "", "", "", "", "", wall, "\n",
        wall, "", wall, "", wall, "", wall, "", wall, "", wall, "", wall, "\n",
        wall, "", "", "", wall, "", "", "", wall, "", "", "", wall, "\n",
        wall, wall, wall, tp, wall, wall, wall, wall, wall, tp, wall, wall, wall, "\n"
      ]
      var pkt = [
        no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin,
        no_coin, coin, coin, coin, no_coin, coin, coin, coin, no_coin, coin, coin, coin, no_coin, no_coin,
        no_coin, coin, no_coin, coin, no_coin, coin, no_coin, coin, no_coin, coin, no_coin, coin, no_coin, no_coin,
        no_coin, coin, coin, coin, coin, coin, no_coin, coin, coin, coin, coin, coin, no_coin, no_coin,
        no_coin, coin, no_coin, no_coin, no_coin, coin, no_coin, coin, no_coin, no_coin, no_coin, coin, no_coin, no_coin,
        no_coin, coin, coin, coin, coin, coin, coin, coin, coin, coin, coin, coin, no_coin, no_coin,
        no_coin, coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, coin, no_coin, no_coin, no_coin, no_coin,
        no_coin, coin, coin, coin, no_coin, no_coin, no_coin, no_coin, no_coin, coin, coin, coin, no_coin, no_coin,
        no_coin, no_coin, no_coin, coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, coin, no_coin, no_coin,
        no_coin, coin, coin, coin, coin, coin, no_coin, coin, coin, coin, coin, coin, no_coin, no_coin,
        no_coin, coin, no_coin, no_coin, no_coin, coin, no_coin, coin, no_coin, no_coin, no_coin, coin, no_coin, no_coin,
        no_coin, coin, coin, coin, coin, coin, no_coin, coin, coin, coin, coin, coin, no_coin, no_coin,
        no_coin, coin, no_coin, coin, no_coin, coin, no_coin, coin, no_coin, coin, no_coin, coin, no_coin, no_coin,
        no_coin, coin, coin, coin, no_coin, coin, coin, coin, no_coin, coin, coin, coin, no_coin, no_coin,
        no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin, no_coin
      ]


      for (let i = 0; i < grid.length; i++) {
        if (grid[i] == "") {
          dp.push(pkt[i])
        }
        if (grid[i] == "\n" || grid[i] == wall || grid[i] == gate || grid[i] == tp) { dp.push(grid[i]) }
        else { dp.push(grid[i].display) }
      }

      dp = dp.join("")
      dp = dp.split("\n")
      var display1 = dp.slice(0, parseInt(dp.length / 2))
      var display2 = dp.slice(parseInt(dp.length / 2))

      send("Punkty: `" + score+"`")
      send(display1)
      send(display2)
      const startEmbed = new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Gra się zaczęła")
        .setDescription("używaj `w` `a` `s` `d` by się poruszać")
        .setFooter("(nie używaj prefix'u!)")
      send(startEmbed)
      var game = setInterval(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
          var [Xbefor, Ybefor] = [player.x, player.y]
          switch (collected.first().content) {
            case 'w':
              player.y--
              if (grid[player.y * 14 + player.x] == wall) {
                player.y++
              }
              else {
                moved = true
              }
              break;
            case 'a':
              player.x--
              if (grid[player.y * 14 + player.x] == wall) {
                player.x++
              }
              else {
                moved = true
              }
              break;
            case 's':
              player.y++
              if (grid[player.y * 14 + player.x] == wall || grid[player.y * 14 + player.x] == gate) {
                player.y--
              }
              else {
                moved = true
              }
              break;
            case 'd':
              player.x++
              if (grid[player.y * 14 + player.x] == wall) {
                player.x--
              }
              else {
                moved = true
              }
              break;
          }
          if (moved) {
            if ((player.x == ghost0.x && player.y == ghost0.y) || (player.x == ghost1.x && player.y == ghost1.y) || (player.x == ghost2.x && player.y == ghost2.y)) {
              end = true
              grid[Ybefor * 14 + Xbefor] = "";
              grid[player.y * 14 + player.x].display = ":sob:";
            }
            else {
              if (move > 0) {
                var Gh2Ybefor = ghost2.y
                var Gh2Xbefor = ghost2.x

                if (move == 1) {
                  ghost2.y = 5
                  ghost2.x = 6
                }
                else {
                  if (grid[(ghost2.y + gh2_y) * 14 + (ghost2.x + gh2_x)] == wall || grid[(ghost2.y + gh2_y) * 14 + (ghost2.x + gh2_x)] == tp) {
                    if (gh2_x == -1 || gh2_x == 1) {
                      gh2_x = 0
                      gh2_y = ([-1, 1])[Math.floor(Math.random() * 2)]
                      if (grid[(ghost2.y + gh2_y) * 14 + (ghost2.x + gh2_x)] == wall || grid[(ghost2.y + gh2_y) * 14 + (ghost2.x + gh2_x)] == tp) {
                        gh2_y *= -1
                      }
                    }
                    else if (gh2_y == -1 || gh2_y == 1) {
                      gh2_y = 0
                      gh2_x = ([-1, 1])[Math.floor(Math.random() * 2)]

                      if (grid[(ghost2.y + gh2_y) * 14 + (ghost2.x + gh2_x)] == wall || grid[(ghost2.y + gh2_y) * 14 + (ghost2.x + gh2_x)] == tp) {
                        gh2_x *= -1
                      }
                    }
                  }
                  ghost2.y += gh2_y
                  ghost2.x += gh2_x
                }
              }
              if (move > 4) {
                if (moves == 0) {
                  moves++;
                  var Gh1Ybefor = ghost1.y;
                  var Gh1Xbefor = ghost1.x;

                  if (move == 5) {
                    ghost1.y = 5;
                    ghost1.x = 6;
                  }
                  else {
                    switch (Astar_pathfinding(ghost1, player)[0]) {
                      case "y+":
                        ghost1.y += 1;
                        break;
                      case "y-":
                        ghost1.y -= 1;
                        break;
                      case "x+":
                        ghost1.x += 1;
                        break;
                      case "x-":
                        ghost1.x -= 1;
                        break;
                    }
                  }
                }
                else {
                  moves = 0;
                }
              }
              if (move > 9) {
                var Gh0Ybefor = ghost0.y
                var Gh0Xbefor = ghost0.x

                if (move == 10) {
                  ghost0.y = 5
                  ghost0.x = 6
                }
                else {
                  switch (Astar_pathfinding(ghost0, player)[0]) {
                    case "y+":
                      ghost0.y += 1;
                      break;
                    case "y-":
                      ghost0.y -= 1;
                      break;
                    case "x+":
                      ghost0.x += 1;
                      break;
                    case "x-":
                      ghost0.x -= 1;
                      break;
                  }
                }
              }

              grid[Ybefor * 14 + Xbefor] = "";
              grid[Gh0Ybefor * 14 + Gh0Xbefor] = "";
              grid[Gh1Ybefor * 14 + Gh1Xbefor] = "";
              grid[Gh2Ybefor * 14 + Gh2Xbefor] = "";
              grid[ghost0.y * 14 + ghost0.x] = new Gh(0)
              grid[ghost1.y * 14 + ghost1.x] = new Gh(1)
              grid[ghost2.y * 14 + ghost2.x] = new Gh(2)

              if (player.y == 0) { player.y = 13 }
              if (player.y == 14) { player.y = 1 }
              if (player.x == 0) { player.x = 11 }
              if (player.x == 12) { player.x = 1 }
              if (pkt[player.y * 14 + player.x] == coin) {
                score++;
                pkt[player.y * 14 + player.x] = no_coin;
              }
              grid[player.y * 14 + player.x] = new Pl(character)

              if ((player.x == ghost0.x && player.y == ghost0.y) || (player.x == ghost1.x && player.y == ghost1.y) || (player.x == ghost2.x && player.y == ghost2.y)) {
                end = true
                grid[player.y * 14 + player.x].display = ":sob:";
              }
              else if (score == 89) {
                grid[player.y * 14 + player.x].display = ":partying_face:"
              }
            }
            dp = []
              for (let i = 0; i < grid.length; i++) {
                if (grid[i] == "") {
                  dp.push(pkt[i])
                }
                if (grid[i] == "\n" || grid[i] == wall || grid[i] == gate || grid[i] == tp) { dp.push(grid[i]) }
                else { dp.push(grid[i].display) }
              }

              dp = dp.join("")
              dp = dp.split("\n")
              display1 = dp.slice(0, parseInt(dp.length / 2))
              display2 = dp.slice(parseInt(dp.length / 2))

              send("Punkty: `" + score+"`")
              send(display1)
              send(display2)
              moved = false
              move++
          }
          collected.first().content = ""
        })
        if (score == 89) {
          const endEmbed = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setTitle("Koniec gry!")
            .setDescription("WYGRAŁEŚ(-AŚ)")
          clearInterval(game)
          return send(endEmbed)
        }
        if (end) {
          const endEmbed = new Discord.MessageEmbed()
            .setColor("#ff3333")
            .setTitle("Koniec gry!")
            .setDescription("PRZEGRAŁEŚ(-AŚ)")
          clearInterval(game)
          return send(endEmbed)
        }
      }, 1000);
    });
  }
  else {
    return message.author.send("Po cO mNiE PiNgUjEsZ\n*i tak nie znasz komend, lepiej użyj `" + prefix + "pomoc`*\n(╯°□°）╯︵ ┻━┻")
  }
})

bot.login(botconfig.token);

function Gh(n) {
  var mood = [":rage:", ":cold_face:", ":nauseated_face:"];
  this.pt = false
  this.display = mood[n];
  this.x = 5 + n
  this.y = 7
}

function Pl(player) {
  this.display = player
  this.x = 6
  this.y = 9
}
function findPath(start_Coordinates, grid) {
  var y = start_Coordinates[0];
  var x = start_Coordinates[1];

  var location = {
    y: y,
    x: x,
    path: [],
    status: 'Start'
  };

  var path_list = [location];

  while (path_list.length > 0) {
    var current_position = path_list.shift();

    var directions = ["y-", "x+", "y+", "x-"];
    for (i in directions) {
      var new_position = check_direction(current_position, directions[i], grid);
      if (new_position.status === 'Goal') {
        return new_position.path;
      }
      else if (new_position.status === 'Valid') {
        path_list.push(new_position);
      }

    }
  }

  return false;

};

var position_status = function (location, grid) {
  var alt_y = location.y;
  var alt_x = location.x;

  if (location.x < 0 ||
    location.x >= 12 ||
    location.y < 0 ||
    location.y >= 15) {

    return 'Invalid';
  } else if (grid[alt_y][alt_x] === 2) {
    return 'Goal';
  } else if (grid[alt_y][alt_x] !== 0) {
    return 'Blocked';
  } else {
    return 'Valid';
  }
};

function check_direction(current_position, direction, grid) {
  var new_Path = current_position.path.slice();
  new_Path.push(direction);

  var alt_y = current_position.y;
  var alt_x = current_position.x;

  if (direction === 'y-') {
    alt_y -= 1;
  } else if (direction === 'x+') {
    alt_x += 1;
  } else if (direction === 'y+') {
    alt_y += 1;
  } else if (direction === 'x-') {
    alt_x -= 1;
  }

  var new_position = {
    y: alt_y,
    x: alt_x,
    path: new_Path,
    status: 'Unknown'
  };
  new_position.status = position_status(new_position, grid);

  if (new_position.status === 'Valid') {
    grid[new_position.y][new_position.x] = 'Visited';
  }

  return new_position;
};
function Astar_pathfinding(ghost, player) {
  var grid = [
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  ]

  grid[ghost.y][ghost.x] = 3;
  grid[player.y][player.x] = 2;

  return findPath([ghost.y, ghost.x], grid);
}