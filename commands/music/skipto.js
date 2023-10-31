const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
require('dotenv').config()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skipto')
    .setDescription('Skips to the number in the list.')
    .addIntegerOption(option => option.setName('position')
      .setDescription('Provide the desirable place of your song in the queeu.')
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

        const num = Number(interaction.options.get("position").value)

        await client.distube.jump(interaction, num).then(song => {
          interaction.reply({ content: `Skipped to: ${song.name}` })
        })
      }
      
};
