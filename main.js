const Discord = require("discord.js");
require("dotenv").config();
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.queue = new Map();

require(`./handlers/commands`)(client);
require(`./handlers/events`)(client);

client.login(ODY5MDkwMTQ5ODg2MjAxODg2.YP5JRg.V9fLGK6yEUep08YDZtL_6Waawt8);
