const { Client, Intents } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('./config.json')
const fetch = require('node-fetch')

const rest = new REST().setToken(token)

// const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

const client = new Client({intents: []})
client.token = token

const fetchUser = async id => client.users.fetch(id)

console.log(fetchUser('645570876984655903'))

client.once('ready', () => {
  const fetchUser = async id => {
    const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
      headers: {
        Authorization: `Bot ${token}`
      }
    })
    if (!response.ok) throw new Error(`Error status code: ${response.status}`)
    return JSON.parse(await response.json())
  }
  
  console.log(fetchUser('645570876984655903'))
});



client.login(token)