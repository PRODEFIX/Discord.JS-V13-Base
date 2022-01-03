const Discord = require("discord.js");
const cooldowns = new Map();

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        const prefix = "a+";

        if (!message.guild) return;
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

        if (!command) return;

        if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());

        const now = Date.now();
        const time = cooldowns.get(command.name);
        const cooldown = command.cooldown * 1000;

        if (time.has(message.author.id)) {
            const expiration = time.get(message.author.id) + cooldown;

            if (now < expiration) {
                const left = (expiration - now) / 1000;

                return message.reply(`**${message.author}, veuillez attendre ${left.toFixed(1)} seconde(s) avant d'utiliser cette commande !**`)
            }
        }

        time.set(message.author.id, now);
        setTimeout(() => time.delete(message.author.id), cooldown);

        if (command.userPerm && !message.member.permissions.has(command.userPerm)) {
            let embed = new Discord.MessageEmbed()
                .setColor(client.rouge)
                .setDescription(`Tu n'as pas la permission d'exécuter cette commande !`)
            return message.reply({ embeds: [embed] });
        }

        try {
            command.execute(client, message, args);
        } catch (error) {
            message.reply(`**Une erreur s'est produite pendant l'exécution de la commande !**`);
            console.log(error);
        }
    }
}