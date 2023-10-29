const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
const config = require("../../configs/config.json")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('seek')
    .setDescription('Seeks the exact second.')
    .addIntegerOption(option => option.setName('second')
      .setDescription('Secs to seek.')
      .setRequired(true)),

      async execute(interaction) {
        const queue = client.distube.getQueue(interaction)
        if (!queue) {
          const noQueueEmbed = new EmbedBuilder()
            .setColor(config.red)
            .setTitle(`❌ | There is nothing in the queue`)
            .setTimestamp()
            .setFooter({ text: ' ' });
            
          await interaction.reply({ embeds: [noQueueEmbed] })
        }

        const time = Number(interaction.options.get("second").value)

        queue.seek(time)
        interaction.reply(`Seeked to ${time}!`)
      }
      
};
