const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
const config = require("../../configs/config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('List the queue'),

  async execute(interaction) {
    const queue = client.distube.getQueue(interaction);

    if (!queue) {
      const noQueueEmbed = new EmbedBuilder()
        .setColor(config.red)
        .setTitle(`❌ | There is no queue`)
        .setTimestamp()
        .setFooter({ text: ' ' });

      return await interaction.reply({ embeds: [noQueueEmbed] });
    }

    const songs = queue.songs.map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``);
    const chunks = splitArrayIntoChunks(songs, 10); // Split into chunks of 10 songs each

    for (const chunk of chunks) {
      const queueEmbed = new EmbedBuilder()
        .setColor(config.def_color)
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