const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 
const { client } = require("../../index.js"); 
require('dotenv').config() 
 
 
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
            .setColor(process.env.RED) 
            .setTitle("❌ | There is nothing in the queue") 
            .setTimestamp() 
            .setFooter({ text: ' ' }); 
             
          await interaction.reply({ embeds: [noQueueEmbed] }) 
        } 
        let mode = parseInt(interaction.options.get("mode").value) 
 
        mode = queue.setRepeatMode(mode) 
        mode = mode ? (mode === 2 ? 'Queue' : 'Song') : 'Off' 
        let emoji = mode ? (mode === 2 ? '🔁': '🔂') : '📴' 
        const loopEmbed = new EmbedBuilder() 
        .setColor(process.env.GREEN) 
        .setTitle(` ${emoji} | Loop`) 
        .setDescription(mode) 
        .setTimestamp() 
        .setFooter({ text: ' ' }); 
     
        await interaction.reply({embeds: [loopEmbed] }) 
      } 
       
}; 
