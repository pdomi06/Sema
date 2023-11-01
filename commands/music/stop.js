const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 
const { client } = require("../../index.js"); 
require('dotenv').config() 
 
module.exports = { 
  data: new SlashCommandBuilder() 
    .setName('stop') 
    .setDescription('Stops the music, clears the queue, leaves the channel.'), 
 
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
        queue.stop() 
        interaction.reply("Stopped!") 
      } 
       
}; 
