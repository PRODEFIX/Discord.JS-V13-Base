const Discord = require('discord.js');
const client = new Discord.Client({
    intents: 32767,
    partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION', 'USER'],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});
require("dotenv").config();
require("./Handlers/Events")(client);

client.login(process.env.token);