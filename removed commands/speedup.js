const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 
const { client } = require("../index.js"); 
require('dotenv').config() 
 
 
module.exports = { 
  data: new SlashCommandBuilder() 
    .setName('speedup') 
    .setDescription('Applies speed up to the music. (toggle)'), 
 
  async execute(interaction) { 
    const queue = client.distube.getQueue(interaction) 
 
    if (!queue) { 
      const noQueueEmbed = new EmbedBuilder() 
        .setColor(process.env.RED) 
        .setTitle("❌ | There is nothing in the queue") 
        .setTimestamp() 
        .setFooter({ text: ' ' }); 
         
      await interaction.reply({ embeds: [noQueueEmbed], ephemeral: true }) 
    } 
 
    const filter = "nightcore" 
     
    if (Object.keys(client.distube.filters).includes(filter)) { 
      if (queue.filters.has(filter)){ queue.filters.remove(filter) 
      title = "✅ | Speedup removed"  
      } else { 
        queue.filters.add(filter) 
        title = "✅ | Speedup added:" 
      } 
    } 
 
 
    const speedupEmbed = new EmbedBuilder() 
    .setColor(process.env.GREEN) 
    .setTitle(title) 
    .setTimestamp() 
    .setFooter({ text: ' ' }); 
     
  await interaction.reply({ embeds: [speedupEmbed], ephemeral: true }) 
 
  setTimeout(() => { 
    interaction.deleteReply(); 
  }, 5000); 
  }, 
 
}; 
 
