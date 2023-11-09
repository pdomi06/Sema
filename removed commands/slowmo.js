const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 
const { client } = require("../index.js"); 
require('dotenv').config() 
 
 
module.exports = { 
  data: new SlashCommandBuilder() 
    .setName('slowmo') 
    .setDescription('Applies slowmo to the music. (toggle)'), 
 
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
 
    const filter = "vaporwave" 
     
 if (Object.keys(client.distube.filters).includes(filter)) { 
      if (queue.filters.has(filter)){ queue.filters.remove(filter) 
      let title = "✅ | Slowmo removed"  
      } else { 
        queue.filters.add(filter) 
         title = "✅ | Slowmo added:" 
      } 
    } 
 
 
    const slowmoEmbed = new EmbedBuilder() 
    .setColor(process.env.GREEN) 
    .setTitle(title) 
    .setTimestamp() 
    .setFooter({ text: ' ' }); 
     
  await interaction.reply({ embeds: [slowmoEmbed], ephemeral: true }) 
 
  setTimeout(() => { 
    interaction.deleteReply(); 
  }, 5000); 
  }, 
 
}; 
 
