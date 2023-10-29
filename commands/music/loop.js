const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
const config = require("../../configs/config.json")


module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Repeats the music(s).')
    .addStringOption(option => option.setName('mode')
    .setDescription('Mode of the loop')
    .setRequired(true)
    .addChoices(
      { name: "off", value: "0" },
      { name: "song", value: "1"},
      { name: "queue", value: "2"}

    )),

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
        let mode = parseInt(interaction.options.get("mode").value)

        mode = queue.setRepeatMode(mode)
        mode = mode ? (mode === 2 ? 'Queue' : 'Song') : 'Off'
        emoji = mode ? (mode === 2 ? '🔁': '🔂') : '📴'
        const loopEmbed = new EmbedBuilder()
        .setColor(config.green)
        .setTitle(` ${emoji} | Loop`)
        .setDescription(mode)
        .setTimestamp()
        .setFooter({ text: ' ' });
    
        await interaction.reply({embeds: [loopEmbed] })
      }
      
};
