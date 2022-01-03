const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

module.exports = async (client) => {
    const Table = new Ascii("Commande chargé");

    (await PG(`${process.cwd()}/Commandes/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name) return Table.addRow(file, "⛔ ERREUR", "Nom invalide !");

        client.commands.set(command.name, command);

        Table.addRow(command.name, "✔ CHARGÉ");

    })
    console.log(Table.toString());
}