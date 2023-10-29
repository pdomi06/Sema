const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
const config = require("../../configs/config.json")


module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the music'),

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
      const resumeEmbed = new EmbedBuilder()
      .setColor(config.green)
      .setTitle(`▶️ | Resumed the song`)
      .setTimestamp()
      .setFooter({ text: ' ' });
      await interaction.reply({ embeds: [resumeEmbed], ephemeral: true })
    } else {
    queue.pause()
    const pauseEmbed = new EmbedBuilder()
    .setColor(config.green)
    .setTitle(`⏸️ | Paused the song`)
    .setTimestamp()
    .setFooter({ text: ' ' });

    await interaction.reply({ embeds: [pauseEmbed], ephemeral: true })

    }

    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  }
};
