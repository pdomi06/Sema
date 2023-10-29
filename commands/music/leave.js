const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
const config = require("../../configs/config.json")


module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leaves the channel.'),

      async execute(interaction) {

        client.distube.voices.leave(interaction)
        {
          const leaveEmbed = new EmbedBuilder()
            .setColor(config.green)
            .setTitle(`💣 | Disconnect`)
            .setTimestamp()
            .setFooter({ text: ' ' });
            
          await interaction.reply({ embeds: [leaveEmbed] })
        }
      }
      
};
