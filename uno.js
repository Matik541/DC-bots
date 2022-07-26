const Discord = require('discord.js')
const { token } = require('./config.json')
const client = new Discord.Client()

const prefix = ';'

client.on('ready', () => {
	console.log('UNO is ready to play!')
})

client.on('message', (msg) => {
	function send(message) {
		msg.channel.send(message)
	}
	function warn(message) {
		msg.channel.send('```fix\n!' + message + '```')
	}

	if (msg.author.bot || !msg.content.startsWith(prefix)) return
	var args = msg.content.trim().split(' ')
	var command = args[0].split(';')[1]
	args.shift()

	if (command == 'uno') {
		send('NO U!');
		let players;

		if(msg.member.voice.channelID == null) {
			let filter = m => m.author === msg.author;
			const collector = msg.channel.createMessageCollector(filter, { time: 9999999 });
	
			collector.on('collect', m => {
				console.log(m.content);
				send('You aren\'t on Voice Channel, who do you want to play with?\nType: `@name` to add someone, until everyone is ready. If everything is okay type: `confirm`')
				if((m.content).trim() === 'confirm') {
					send('Game start!')
					collector.stop()
					
				}
				else{

				}
			})
		}
		else{
			players = msg.member.voice.channel.members;
		}


		let filter = m => m.author === msg.author;
		const collector = msg.channel.createMessageCollector(filter, { time: 9999999999999 });

		collector.on('collect', m => {
			console.log(m.content);
		})
		collector.on('end', m => {
			console.log(m.content);
		})
	}

	if(command == 'kill'){kill()}
})

client.login(token)
