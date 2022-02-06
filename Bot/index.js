const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require('./config.json');

const client = new Client({
    intents: 32767,
});
client.login(config.token);
module.exports = client.application;

// Initializing the project
require("./handler")(client.application);


// Global Variables
client.application.commands = new Collection();
client.application.slashCommands = new Collection();