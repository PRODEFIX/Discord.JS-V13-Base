const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');
const Events = require('../Validation/EventNames');

module.exports = async (client) => {
    const Table = new Ascii("Events chargé");

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if (!event.name || !Events.includes(event.name)) return Table.addRow(file.split("/")[7], "⛔ ERREUR", "Nom invalide !");

        if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
        else client.on(event.name, (...args) => event.execute(...args, client));

        if (event.description) return await Table.addRow(`${event.name}/${event.description}`, "✔ CHARGÉ");

        await Table.addRow(event.name, "✔ CHARGÉ")
    });

    console.log(Table.toString());
}
