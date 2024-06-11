const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 
const { client } = require("../../index.js"); 
require('dotenv').config() 
 
 
module.exports = { 
  data: new SlashCommandBuilder() 
    .setName('previous') 
    .setDescription('Plays the previous music'), 
 
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
        try { 
          await queue.previous() 
          await interaction.reply({content: "Skipped backward", ephemeral: true }) 
 
        } catch (e) { 
          interaction.reply(` ${e}`) 
        } 
 
        setTimeout(() => { 
          interaction.deleteReply(); 
        }, 5000); 
      } 
       
}; 
