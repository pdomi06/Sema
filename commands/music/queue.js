const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 
const { client } = require("../../index.js"); 
require('dotenv').config() 
 
module.exports = { 
  data: new SlashCommandBuilder() 
    .setName('queue') 
    .setDescription('List the queue'), 
 
  async execute(interaction) { 
    const queue = client.distube.getQueue(interaction); 
 
    if (!queue) { 
      const noQueueEmbed = new EmbedBuilder() 
        .setColor(process.env.RED) 
        .setTitle("❌ | There is no queue") 
        .setTimestamp() 
        .setFooter({ text: ' ' }); 
 
      return interaction.reply({ embeds: [noQueueEmbed] }); 
    } 
 
    const songs = queue.songs.map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``); 
    const chunks = splitArrayIntoChunks(songs, 10); // Split into chunks of 10 songs each 
 
    for (const chunk of chunks) { 
      const queueEmbed = new EmbedBuilder() 
        .setColor(process.env.DEF_COLOR) 
        .setTitle('Server Queue') 
        .setDescription(chunk.join('\n')) 
        .setTimestamp() 
        .setFooter({ text: ' ' }); 
 
      interaction.reply({ embeds: [queueEmbed] }); 
    } 
  }, 
}; 
 
function splitArrayIntoChunks(array, chunkSize) { 
  const resultArray = []; 
  for (let i = 0; i < array.length; i += chunkSize) { 
    const chunk = array.slice(i, i + chunkSize); 
    resultArray.push(chunk); 
  } 
  return resultArray; 
}