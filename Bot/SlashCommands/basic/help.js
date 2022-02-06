const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require('node:fs');

module.exports = {
    ...new SlashCommandBuilder()
          .setName("help")
          .setDescription("Get a list of all usable commands."),

     run: async (client, interaction, args) => {
          interaction.followUp({message: "The bot is currently undergoing a full overhaul, and is unavailable at this time.\nPlease check back later."});
     },
};
