module.exports = {
    name: "ping",
    description: "Pour voir le ping du bot",
    
    async execute(client, message, args) {
        message.reply(`Pong ! ${client.ws.ping}ms`);
    }
}