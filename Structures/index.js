const Discord = require('discord.js');
const client = new Discord.Client({
    intents: 98303,
    partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION', 'USER'],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});
require("dotenv").config();
client.commands = new Discord.Collection();

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(process.env.token);