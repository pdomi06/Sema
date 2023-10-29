const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
const config = require("../../configs/config.json")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips one in the queue'),

      async execute(interaction) {
        const queue = client.distube.getQueue(interaction)
        if (!queue) {
          const noQueueEmbed = new EmbedBuilder()
            .setColor(config.red)
            .setTitle(`❌ | There is nothing in the queue`)
            .setTimestamp()
            .setFooter({ text: ' ' });
            
          await interaction.reply({ embeds: [noQueueEmbed], ephemeral: true })
        }
        try {
          const song = await queue.skip()
          await interaction.reply({content: "Skipped the song", ephemeral: true })

        } catch (e) {
          interaction.reply(` ${e}`)
        }

        setTimeout(() => {
          interaction.deleteReply();
        }, 5000);
      }
      
};
