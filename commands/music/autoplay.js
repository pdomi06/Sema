const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
require('dotenv').config()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autoplay')
    .setNameLocalizations({
      hu: 'autoplay',
    })
    .setDescription('Plays music automatically. (toggle)')
    .setDescriptionLocalizations({
      hu: 'Plays music automatically. (toggle)'
    }),
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
    const autoplay = queue.toggleAutoplay()
    const autoplayEmbed = new EmbedBuilder()
    .setColor(process.env.DEF_COLOR)
    .setTitle(`⏩ | Autoplay`)
    .setDescription(autoplay ? "On" : "Off")
    .setTimestamp()
    .setFooter({ text: ' ' });

    await interaction.reply({embeds: [autoplayEmbed], ephemeral: true })

    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  }

};
