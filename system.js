const botconfig = require("./botconfig.json");
const Discord = require("discord.js")
const prefix = ";"
var nazwabota = "System"
var wersja = "0.3.7"
const mysql = require("mysql");
const { repeat, last, update } = require("lodash");
const { setInterval } = require("timers");

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
    console.log(`${nazwabota} jest online`)
});

var con = mysql.createConnection({
    host: "pioterhub.eu",
    user: "33074250_rp",
    password: "twojstarypijany",
    database: "33074250_rp"
  });

con.connect((err) => {
    if(err){
      console.log('Błąd połączenia');
      return;
    }
    console.log('Połączenie udane');

bot.on("message", async message => {
    if (message.author.bot) return;

    let args = message.content.substring(prefix.length).split(" ")
    
    switch (args[0]) {
        case '<@!737658864199270530>' :
            message.channel.send("I na chuj mnie pingujesz?")
        break;

        case 'XD':
            setInterval(function(){
                bot.user.setActivity('Wbij na')
                setTimeout(function(){
                    bot.user.setActivity('kanał')
                }, 1000);
                setTimeout(function(){
                    bot.user.setActivity('Matik 12')
                }, 2000);
                setTimeout(function(){
                    bot.user.setActivity('na YT')
                }, 3000);
                setTimeout(function(){
                    bot.user.setActivity('Wbij na knanał Matik 12 na YT')
                }, 4000);
            }, 4000)
        break;
    //dodawanie
        case "dodaj" :
                var embed9 = new Discord.RichEmbed()
                .setTitle("Liczab punktów: 15")
                .setDescription("Rozdaj punkty w statystyki i broń")
                .addField("Broń", "AWP `100dmg, 0.5sps, 10ammo` - 5pkt\nAK-47 `30dmg, 5sps, 30ammo` - 4pkt\nStrzelba `40dmg, 2.5sps, 10ammo` - 3pkt\nP90 `15dmg, 10sps, 50ammo` - 2pkt\nUSP-S `10dmg, 2.5sps, 10ammo` - 1pkt")
                message.channel.send(embed9)
                .then(function (message) {
                    message.react("5️⃣")
                    .then(() => message.react("4️⃣"))
                    .then(() => message.react("3️⃣"))
                    .then(() => message.react("2️⃣"))
                    .then(() => message.react("1️⃣"))
                              
                    const filter = (reaction, user) => {
                        return ['5️⃣', '4️⃣', '3️⃣', '2️⃣', '1️⃣'].includes(reaction.emoji.name) && user === message.author.id && !user.bot;
                    }
                    
                    console.log(filter)
                 message.awaitReactions (filter , {time: 60000, errors: ['time']})
                    .then(collected => {
                    const reaction = collected.first();
                        if(reaction.emoji.name === '5️⃣'){
                            message.reply('5');
                        }
                        if(reaction.emoji.name === '4️⃣'){
                            message.reply('4');
                        }
                        if(reaction.emoji.name === '3️⃣'){
                            message.reply('3');
                        }
                        if(reaction.emoji.name === '2️⃣'){
                            message.reply('2');
                        }
                        if(reaction.emoji.name === '1️⃣'){
                            message.reply('1');
                        }
                        
                            var embed10 = new Discord.RichEmbed()
                            .setTitle("Siła", "`+20% obrażeń, +5% zdrowia, -5% szybkości`")
                            .addField("Zwinność", "`+20% szybkości, +5%zdrowia, -5%obrażeń`")
                            .addField("Zdrowie", "`+20% zdrowia, +5%obrażeń, +5%szybkości`")
                            .addField("Inteligencja", "`+10% czasu na hakowanie, +15IQ`")
                            .addField("Szczęście", "`+10%`")
                            .addField("Wyślij zgłoszenie", "https://forms.gle/eVxuX91JM53ZhMAg8")

                            message.channel.send(embed10)
                        })
                })
        break;

        //say
        case "say" :
            message.delete()
            if(message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(message.content.slice(prefix.length+3)) 
            else
            message.channel.send("Nie posiadasz permisji!") 
        break;

        //skarb
        case "skarb" :
            con.query(`SELECT saldo FROM statystyki WHERE id = ${message.member.id}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                rows = rows.slice(9, -1)
                var saldo = rows
                saldo = saldo + 10000000
            var sql = `UPDATE statystyki SET Saldo = ${saldo} WHERE id = ${message.member.id}`;
            con.query(sql, function (err, rows) {
                if (err) throw err;
                console.log(rows.affectedRows + " record(s) updated");
            if(message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Znalazłeś skard!"), message.delete()
            else
            message.channel.send("Nie posiadasz permisji!"), message.delete()
        })})
        break;

        //reakcje
        case "t/n" :
            message.reply("System: Potwierdzasz?")
                .then(function (message) {
                    message.react("✅")
                    message.react("❎")
                })
        break;

        //los
        case "los" :
            var opcje = (message.content.slice(prefix.length+3))
            var los = (Math.floor(Math.random() * opcje)+1)
            message.channel.send("System: Wylosowana wartość to "+los)
        break;

        //pomoc
        case "system" :
            var embed1 = new Discord.RichEmbed()
            .setTitle("System GuardOfWorld:")
            .setDescription("Obsługuje wirtualny świat RP")
            .addField("Podstawowe komendy", "`;system` wyświetla tą liste \n `;los <maksymalna liczba>` losuje liczbę od 1 do podanej \n `;say <wiadomość>` Jeżeli bot nie ma odpowiedzi na pytanie, możesz samemu odpowiedzieć")
            .addField("Komendy ściścle do RP", "`;Saldo` Sprawdza stan konta\n `;hax` rozpoczyna mini grę hakowania \n `haxpomoc` wsysyła wskazówki jak hakować\n`;luck` sprawdza twoje szczescie (Udane / Nieudane) \n`;Praca` idziesz do pracy na 8godzin \n `997` Wzywa policję, ale pamietaj ten numer to kłopoty \n `;Kasyno [Kwota] <czarny | czerwony | 0>` Możesz się wzbogacić, albo stracić wszystko -NIE DZIAŁĄ- \n `;Siłownia` Podnosi statystyki Siły i Zręczności -NIE DZIAŁA-")
            .addField("O bocie:", "Powstał na potrzeby rozwijającego się na moim serwerze `RP` 😅")
            .addField("Właściciel bota:", "Matik 😷#3124")
            .addField("Aktualna wersja:", wersja)
            .addField("Pomagali przy bocie :heart:", "Pioter")
            .addField("Testerzy bota ", "@klajnus 😷#7570, @Pioter#2137")
            .setColor("GREEN")
            .setFooter(message.member.user.tag)

            var embed2 = new Discord.RichEmbed()
            .setTitle("Soccial media mojego Twórcy:")
            .addField("YouTube:", "https://www.youtube.com/channel/UCaC4eA5wMvzzo3CXK6V33nQ")
            .addField("Strona WWW:", "Work In Progres")
            .addField("Discord:", "https://discord.gg/cPchYqZ")
            .setColor("BLUE")
            .setFooter(message.member.user.tag)

            message.author.send(embed1), message.author.send(embed2)
        break;

        //sattystyki
        case "staty" :
            con.query(`SELECT sila FROM statystyki WHERE id = ${message.member.id}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                rows = sila 
            con.query(`SELECT zwinnosc FROM statystyki WHERE id = ${message.member.id}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                rows = zwin
            con.query(`SELECT zdrowie FROM statystyki WHERE id = ${message.member.id}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                rows = zdr
            con.query(`SELECT inteligencja FROM statystyki WHERE id = ${message.member.id}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                rows = int
            con.query(`SELECT szczescie FROM statystyki WHERE id = ${message.member.id}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                rows = luck

            var embed6 = new Discord.RichEmbed()
            .setTitle("System: Twoje statystyki")
            .addField("Siła: "+sila)
            .addField("Zwinność: "+zwin)
            .addField("Zdrowie: "+zdr)
            .addField("Inteligencja: "+int)
            .addField("Szczęście: "+luck)

            message.channel.send(embed6)

            })})})})})
        break;

        //saldo
        case "saldo" :
            con.query(`SELECT saldo FROM statystyki WHERE id = ${message.member.id}`, function (err, row) {
                if (err) throw err;
                var row = JSON.stringify(row[0]);
                var row = row.slice(9, -1)
                
                const embed0 = new Discord.RichEmbed()
                    .setColor('GREEN')
                    .addField("Saldo:", row)
                message.channel.send(embed0)
            });
        break;

        //szczęście
        case "luck" :
            con.query(`SELECT szczescie FROM statystyki WHERE id = ${message.member.id}`, function (err, row) {
                if (err) throw err;
                var row = JSON.stringify(row[0]);
                var row = row.slice(13, -1)
                row = row * 1
            var los = (Math.floor(Math.random() * 100 )+1)
            if(row > los){
                return message.channel.send("System: Udane, potrzebowałeś "+los+"% szans, a twoje szczęście wynosi "+row+"%")
            }
            else{
                return message.channel.send("System: Nieudane, potrzebowałeś "+los+"% szans, a twoje szczęście wynosi "+row+"%")
            }
            });
        break;

        //napad
        case "hax" : 

        //hakowanie
            message.channel.send("Hakowanie...")
            var level = (Math.floor(Math.random()*7))
        con.query(`SELECT inteligencja FROM statystyki WHERE id = ${message.member.id}`, function (err, rows) {
            if (err) throw err;
            var rows = JSON.stringify(rows[0]);
            var int = rows.slice(16, -1)
            var int = 35000 + (3500 * int)
            var czas = int / 1000
            con.query(`SELECT l0 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l0 = rows.slice(7, -2)
            con.query(`SELECT l1 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l1 = rows.slice(7, -2)
            con.query(`SELECT l2 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l2 = rows.slice(7, -2)
            con.query(`SELECT l3 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l3 = rows.slice(7, -2)
            con.query(`SELECT l4 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l4 = rows.slice(7, -2)      
            con.query(`SELECT l5 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l5 = rows.slice(7, -2)
            con.query(`SELECT l6 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l6 = rows.slice(7, -2)
            con.query(`SELECT l7 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l7 = rows.slice(7, -2)
            con.query(`SELECT l8 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l8 = rows.slice(7, -2)
            con.query(`SELECT l9 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var l9 = rows.slice(7, -2)
            con.query(`SELECT odp1 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var odp1 = rows.slice(9, -2)
            con.query(`SELECT odp2 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var odp2 = rows.slice(9, -2)
            con.query(`SELECT odp3 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var odp3 = rows.slice(9, -2)
            con.query(`SELECT odp4 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var odp4 = rows.slice(9, -2)
            con.query(`SELECT odp5 FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var odp5 = rows.slice(9, -2)
            con.query(`SELECT col FROM hakowanie WHERE id = ${level}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var col = rows.slice(8, -2)

                const embed5 = new Discord.RichEmbed()
                .setTitle("System: Hakowanie")
                .setDescription("Na zhakowanie masz sekund " + czas + " od teraz\nBy nie zostać wyktytym musisz wysłać całe polecenie ||`wwwwaassdd...` zamianst `a` `w` `w` `a` ...||\nSterowanie: 🔼`w` ◀`a` 🔽`s` ▶`d`")
                .setColor(col)

                message.channel.send(l0+"\n"+l1+"\n"+l2+"\n"+l3+"\n"+l4+"\n"+l5+"\n"+l6+"\n"+l7+"\n"+l8+"\n"+l9)
                .then(() => message.channel.send(embed5))

                const collector = new Discord.MessageCollector(message.channel, m => m.author === message.member.id, { max: 1, time: int });
                    collector.on('collect', message => {
                        console.log(collector, odp1, int)
                        if (message.content === odp1 ) {
                            var hasło = "j"+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))
                            var hasło = hasło.slice(1, 0)
                            message.channel.send("Złamane hasło: "+hasło)
                            con.query(`UPDATE tymczasowe SET haslo = ${hasło} WHERE 1`, function (err, result) {
                                if (err) throw err;
                            });
                            return message.channel.send("System: Hakowanie udane");
                        }
                        if (message.content === odp2 ) {
                            var hasło = "j"+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))
                            var hasło = hasło.slice(1, 0)
                            message.channel.send("Złamane hasło: "+hasło)
                            con.query(`UPDATE tymczasowe SET haslo = ${hasło} WHERE 1`, function (err, result) {
                                if (err) throw err;
                            });
                            return message.channel.send("System: Hakowanie udane");
                        }
                        if (message.content === odp3 ) {
                            var hasło = "j"+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))
                            var hasło = hasło.slice(1, 0)
                            message.channel.send("Złamane hasło: "+hasło)
                            con.query(`UPDATE tymczasowe SET haslo = ${hasło} WHERE 1`, function (err, result) {
                                if (err) throw err;
                            });
                            return message.channel.send("System: Hakowanie udane");
                        }
                        if (message.content === odp4 ) {
                            var hasło = "j"+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))
                            var hasło = hasło.slice(1, 0)
                            message.channel.send("Złamane hasło: "+hasło)
                            con.query(`UPDATE tymczasowe SET haslo = ${hasło} WHERE 1`, function (err, result) {
                                if (err) throw err;
                            });
                            return message.channel.send("System: Hakowanie udane");
                        }
                        if (message.content === odp5 ) {
                            var hasło = "j"+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))+(Math.floor(Math.random()*9))
                            var hasło = hasło.slice(1, 0)
                            message.channel.send("Złamane hasło: "+hasło)
                            con.query(`UPDATE tymczasowe SET haslo = ${hasło} WHERE 1`, function (err, result) {
                                if (err) throw err;
                            });
                            return message.channel.send("System: Hakowanie udane");
                        }
                        else {
                            return message.channel.send("System: Błąd! Hakowanie zostało wyryte");
                        };
                    });
            });});});});});});});});});});});});});});});});});
            message.channel.send("XD dawaj hasło")
            
        break;

        //Kasyno

        //praca
        case "praca" :
            var los = (Math.floor(Math.random()* 11))
            con.query(`SELECT saldo FROM statystyki WHERE id = ${message.member.id}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var saldo = rows.slice(9, -1)
                var saldo = saldo * 1
            con.query(`SELECT praca FROM Praca WHERE id = ${los}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var praca = rows.slice(10, -2)
            con.query(`SELECT zarobek FROM Praca WHERE id = ${los}`, function (err, rows) {
                if (err) throw err;
                var rows = JSON.stringify(rows[0]);
                var zarobek = rows.slice(11, -1);
                var zarobek = zarobek * 1;
                var zarobek = zarobek + (Math.floor(Math.random() * 50)) - 25;
                saldo = saldo + zarobek;
            var embed11 = new Discord.RichEmbed()
                .addField("Praca:", praca)
                .addField("Zarobione pieniądze:", zarobek)
                .addField("Aktualne saldo: ", saldo)
            message.channel.send(embed11)
            con.query(`UPDATE statystyki SET saldo = ${saldo} WHERE id = ${message.member.id}`, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            });});});});
        break;

        //kup lista
        case "kup-lista" :
            var embed4 = new Discord.RichEmbed()
            .setTitle("Lista Przedmiotów")
            .addField("Bonusy", "`FastFood` +10zdrowia, +5% siły, -5% zwinności przez 6h, -15zł \n`Obiad` +25zdrowia, +10%siły przez 6h, -30zł\n")
            .addField("Statystyki","`1` 1a\n `2` 2a")
            .addField("Broń","`USP-S` 2SPS, 15obrażeń, Tłumik, Cenna: 250zł\n`AK-47` 5SPS, 25obrażeń, Cenna: 1250zł\n``")
            .setColor("BLUE")
            message.channel.send(embed4)
        break;

        //kup przedmioty!
        case "kup" :
            message.channel.send("zły zapis, użyj `kup-lista|kup *przedmiot*` ")
        break;

        //
}})});

bot.login(botconfig.token)