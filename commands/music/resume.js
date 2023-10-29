const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
const config = require("../../configs/config.json")


module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Unpauses the song.'),

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
        
        if (queue.paused) {
          queue.resume()
          interaction.reply({ content: 'Resumed the song for you :)', ephemeral: true})
        } else {
          interaction.reply({content: 'The queue is not paused!', ephemeral: true})
        }
        setTimeout(() => {
          interaction.deleteReply();
        }, 5000);
      }
      
};
