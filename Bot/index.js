const { Client, Collection, MessageEmbed } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client.application;

// Global Variables
client.application.commands = new Collection();
client.application.slashCommands = new Collection();
client.application.config = require("./config.json");



// Initializing the project
require("./handler")(client.application);

client.application.login(client.application.config.token);