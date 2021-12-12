module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`Je suis prêt !`);
        client.user.setActivity(`${client.user.tag}`, { type: "WATCHING" });
    }
};
