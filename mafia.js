const botconfig = require("./config.json");
const Discord = require("discord.js");
const { Console } = require("console");
const prefix = "m"
var nazwabota = "Mafia"
var wersja = "0.4.1"

const bot = new Discord.Client({ disableEveryone: true })

bot.on("ready", async () => {
	bot.user.setActivity("Pomoc -> mpomoc")
	console.log(`${nazwabota} jest online`)
});

bot.on("message", async message => {
	if (message.author.bot) return;

	if (message.content.indexOf(prefix) !== 0) return;
	var args = message.content.slice(prefix.length).trim().split(/ +/g);
	var command = args.shift().toLowerCase()

	if (command == "test") {
		message.member.voice.channel.join();
		let VC = message.member.voice.channel

		console.log(VC.members.map(member => member.id))

		var graczid = (VC.members.map(member => [member.id]));
		message.channel.send(graczid)

		let graliczba = VC.members.size
		var klasy = 1
		var psychliczba = 2

		if (graliczba < klasy) {
			console.log()
			return message.channel.send("```ARM\nERROR: coś poszło nie tak, sprawdź czy liczba miejsc w klasach nie jest większa od liczby graczy```")
		}

		for (let limit = 0; limit < 1; limit++) {
			var kto = (Math.floor(Math.random() * graliczba))
			var kls = 0

			if (kls == 0) {
				if (psych == "undefined") {
					var psych = graczid[kto]
					graczid = graczid.slice(kto)
					message.channel.send("wylosowana osoba: <@" + graczid[kto] + "> ")
				}
				else {
					console.log(graczid)
					psych.push(graczid[kto])
					graczid = graczid.slice(kto)
					console.log(graczid)
					message.channel.send("wylosowana osoba: <@" + graczid[kto] + "> ")
				}
			}


		}

		message.channel.send("```ARM\nGra się rozpoczyna```")

	}
	if (command == "pomoc") {

		//Patronite
		var P = ["może ty? ", "0.00zł", "może ty? ", "0.00zł", "może ty? ", "0.00zł"]

		//PayPal
		var PP = ["może ty? ", "0.00zł", "może ty? ", "0.00zł", "może ty? ", "0.00zł"]

		message.channel.send("```ARM\nPomoc``` Na prywatnej wiadomości otrzymałeś informacje o Bocie, miłej lektóry")
		const pomoc = new Discord.MessageEmbed()
			.setTitle("Pomoc")
			.setDescription(`Organizuje gry w "Mafie"`)
			.addField("Podstawowe komendy", "`mpomoc` wyświetla tą liste \n `mgameplay` wyświetla klasy i kilka szczegółów odnośnie gry\n `gra` rozpoczyna całokształt gry (ustawienia > rozgrywka)")
			.addField("O bocie:", "Pomysł na Bota powstał przez przypadek podczas oglądania YouTuba, a dokładnie gry `Agrou` :>")
			.addField("Właściciel bota:", "Matik 😷#3124", true)
			.addField("Aktualna wersja:", wersja, true)
			.addField("Pomagali przy bocie ❤", "Pioter#2137", true)
			.addField("Wsparcie ❤", "[Patronite](https://patronite.pl/Matik/description?podglad-autora=)\n[PayPal](https://www.paypal.com/pools/c/8qKjPn2xkj)\nBot powstaje z prywatnych funduszy, byłbym wdzięczny za każdą pomoc")
			.addField("Top ❤Patronite❤", P[0] + P[1] + "\n" + P[2] + P[3] + "\n" + P[4] + P[5] + "\n[Lista patronów❤]()", true)
			.addField("Top 💙PayPal💙", PP[0] + PP[1] + "\n" + PP[2] + PP[3] + "\n" + PP[4] + PP[5] + "\n[Lista dawców💙]()", true)
			.setColor("RED")
		message.author.send(pomoc)

	}

	if (command == "gameplay") {
		const gameplay = new Discord.MessageEmbed()
			.setTitle("jak grać?")
			.setDescription("W zależności od klasy masz różne zadania i priorytety")
			.addField("Jest 9 różnych klas", "🔴Klasa - Psychopata\n🟠Klasa - Morderca\n🟡Klasy - Diler, Gang\n🟢Klasy - Cywil, Dziecko\n🔵Klasy - Ksiądz, Policja, Polityk")
			.addField("Więcej szczegółów o klasie dostałęś na prywatnej wiadomości", "**Powodzenia w grze**")
		message.channel.send(gameplay)

		const rules = {
			koniec: new Discord.MessageEmbed()
			.setTitle("Gra kończy się:")
			.setDescription("w raz z śmiercią psychopaty\n w raz z śmiercią wszystkich graczy"),
			
			psychopata: new Discord.MessageEmbed()
			.setTitle("Psychopata")
			.setDescription("Status: `Nie Jawna`\nZabija wszystkich")
			.addField("Sojusznicy", "`<brak>`")
			.addField("Wrogowie:", "`Morderca, Diler, Gang, Cywil, Dziecko, Ksiądz, Policja, Polityk`")
			.addField("Warunki zwycięstwa:", "Żyje i nie ma żadnego z Wrogów")
			.setColor("RED"),
			
			morde: new Discord.MessageEmbed()
			.setTitle("Morderca")
			.setDescription("Status: `Nie Jawna`\nWykonuje anonimowe zlecenia na zabójstwo\n||Może pomóc psychopacie lub cywilą||")
			.addField("Sojusznicy:", "`<brak>` ||tylko w teorii||")
			.addField("Wrogowie:", "`Policja, Ksiądz`")
			.addField("Warunki zwycięstwa:", "Żyje i nie ma żadnego z Wrogów\n||Nie kończy gry||")
			.setColor("ORANGE"),
			
			dil: new Discord.MessageEmbed()
			.setTitle("Diler")
			.setDescription("Status: `Nie Jawna`\nRozprowadza narkotyki, ma 2 działki jedną `nieszkodliwe` i `trujące`\n||Ma tylko dwie działki więc musi je rozdać modrze||")
			.addField("Sojusznicy:", "dilerzy, członkowie gangu, cywile")
			.addField("Wrogowie:", "`Psychopata, Policja`")
			.addField("Warunki zwycięstwa:", "Żyje i nie ma żadnego z Wrogów\n||Zostanie z psychopatą nie kończy gry||")
			.setColor("GOLD"),

			gang: new Discord.MessageEmbed()
			.setTitle("Gang")
			.setDescription("Status: `Nie Jawna`\Może zapewnić ochronę jednej osobie na rundę")
			.addField("Sojusznicy:", "Morderca, Diler, Cywil, Dziecko, Ksiądz, Policja, Polityk")
			.addField("Wrogowie:", "`Psychopata`")
			.addField("Warunki zwycięstwa:", "Żyje i nie ma żadnego z Wrogów")
			.setColor("GOLD"),
			
			cywil: new Discord.MessageEmbed()
			.setTitle("Cywil")
			.setDescription("Status: `Nie Jawna`\nŻyj")
			.addField("Sojusznicy:", "`Gang, Dziecko, Ksiądz, Policja, Polityk`")
			.addField("Wrogowie:", "`Psychopata`")
			.addField("Warunki zwycięstwa:", "Żyje i nie ma żadnego z Wrogów")
			.setColor("GREEN"),
			
			dzie: new Discord.MessageEmbed()
			.setTitle("Dziecko")
			.setDescription("Status: `Nie Jawna`\nNie śpi po nocach")
			.addField("Sojusznicy:", "Cywil, Ksiądz, Policja, Polityk")
			.addField("Wrogowie:", "`Psychopata`")
			.addField("Warunki zwycięstwa:", "Żyje i nie ma żadnego z Wrogów")
			.setColor("GREEN"),
			
			ksia: new Discord.MessageEmbed()
			.setTitle("Ksiądz")
			.setDescription("Status: `Jawna`\nŁączy w pary (małżeństwo)\n||Ograniczenie: łączy w pary tylko jeżeli nie ma żadnej innej pary")
			.addField("Sojusznicy:", "`Cywil, Dziecko, Policja, Polityk`")
			.addField("Wrogowie:", "`Psychopata`")
			.addField("Warunki zwycięstwa:", "Żyje i nie ma żadnego z Wrogów")
			.setColor("BLUE"),
			
			polic: new Discord.MessageEmbed()
			.setTitle("Policja")
			.setDescription("Status: `Jawna`\n")
			.addField("Sojusznicy:", "`Cywil, Dziecko, Ksiądz, Polityk`")
			.addField("Wrogowie:", "`Psychopata`")
			.addField("Warunki zwycięstwa:", "Żyje i nie ma żadnego z Wrogów")
			.setColor("BLUE"),
			
			polit: new Discord.MessageEmbed()
			.setTitle("Polityk")
			.setDescription("Status: `Jawna`\n")
			.addField("Sojusznicy:", "`Gang, Cywil, Dziecko, Ksiądz, Policja`")
			.addField("Wrogowie:", "`Psychopata`")
			.addField("Warunki zwycięstwa:", "Żyje i nie ma żadnego z Wrogów")
			.setColor("BLUE")
		}
			
		for (const rule in rules) {
			message.author.send(rules[rule])
		}
	}

	if (command == "gra") {
		const filter = m => m.author.id === message.author.id;
		message.channel.send("```ARM\nCzekaj``` Czy wszyscy gracze znajdują się razem z tobą na kanale głosowym?\n(użyj `tak` jeżeli wszyscy gracze dołączyli)")
		message.channel.awaitMessages(filter, { max: 1, time: 999999999 }).then(collected => {
			if (collected.first().content == 'tak') {

				message.member.voice.channel.join();
				let VC = message.member.voice.channel
				let graczid = VC.members.map(member => member.id)

				let liczby = {
					gra: VC.members.size,
					psych: "1 - 5",
					morde: "0 - 1",
					dil: "0 - 2",
					gang: "0 - 5",
					dzie: "0 - 1",
					ksia: "0 - 1",
					polic: "0 - 5",
					polit: "0 - 1",
				}

				const ustawienia = new Discord.MessageEmbed()
					.setTitle("Ustawienia")
					.setDescription("Wpisując liczby ustawiasz zasady gry")
					.addField("Liczba graczy", liczby.gra)
					.addField("🔴 Psychopata", liczby.psych, true)
					.addField("🟠 Morderca", liczby.morde, true)
					.addField("🟡 Diler", liczby.dil, true)
					.addField("🟡 Gang", liczby.gang, true)
					.addField("🟢 Cywil", "Automatycznie", true)
					.addField("🟢 Dziecko", liczby.dzie, true)
					.addField("🔵 Ksiądz", liczby.ksia, true)
					.addField("🔵 Policja", liczby.polic, true)
					.addField("🔵 Polityk", liczby.polit, true)
			}
		})
	}
})

bot.login(botconfig.token);