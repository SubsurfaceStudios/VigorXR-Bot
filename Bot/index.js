const { Client, Collection, MessageEmbed } = require("discord.js");
const config = require('./config.json');

const client = new Client({
    intents: 32767,
});
module.exports = client;

client.login(config.token);

// Global Variables
client.application.commands.set(new Collection());

// Initializing the project
require("./handler")(client);
