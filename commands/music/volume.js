const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
require('dotenv').config()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Set the volume.')
    .addIntegerOption(option => option.setName('volume')
      .setDescription('10 => 10%')
      .setRequired(true)),

      async execute(interaction) {
        const queue = client.distube.getQueue(interaction)
        if (!queue) {
          const noQueueEmbed = new EmbedBuilder()
            .setColor(process.env.RED)
            .setTitle(`❌ | There is nothing in the queue`)
            .setTimestamp()
            .setFooter({ text: ' ' });
            
          await interaction.reply({ embeds: [noQueueEmbed] })
        }
        const volume = parseInt(interaction.options.get("volume").value)

        queue.setVolume(volume)
        interaction.reply(` Volume set to \`${volume}\``)
      }
      
};
