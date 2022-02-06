const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders")
const fs = require('node:fs');

module.exports = {
    ...new SlashCommandBuilder()
          .setName("template")
          .setDescription("A slash command for use by anyone!")
          .addUserOption(option =>
               option
                    .setName("example_user")
                    .setDescription("The description of the command.")
                    .setRequired(false)
          ),

     run: async (client, interaction, args) => {
          // Command handling here!
     },
};
