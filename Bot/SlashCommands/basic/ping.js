const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require('node:fs');

module.exports = {
    ...new SlashCommandBuilder()
          .setName("ping")
          .setDescription("Test if the bot is currently active."),

     run: async (client, interaction, args) => {
          interaction.followUp({message: "Pong!"});
     },
};
