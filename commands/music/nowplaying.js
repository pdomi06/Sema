const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { client } = require("../../index.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Gives you the information about the current song."),

  async execute(interaction) {
    const queue = client.distube.getQueue(interaction);
    if (!queue) {
      const noQueueEmbed = new EmbedBuilder()
        .setColor(process.env.RED)
        .setTitle("❌ | There is nothing in the queue")
        .setTimestamp()
        .setFooter({ text: " " });

      await interaction.reply({ embeds: [noQueueEmbed] });
    }
    const song = queue.songs[0];

    const nowPlaingEmbed = new EmbedBuilder()
      .setColor(process.env.GREEN)
      .setTitle(` ⏺️ | Current song: ${song.name}`)
      .setURL(song.url)
      .setThumbnail(song.thumbnail)
      .addFields(
        { name: "Name:", value: `\`${song.name}\``, inline: true },
        {
          name: "Duration:",
          value: `\`${song.formattedDuration}\``,
          inline: true,
        },
        { name: "Source:", value: `\`${song.source}\``, inline: true },
        { name: "views:", value: `👁️\`${song.views}\``, inline: true },
        { name: "likes:", value: `👍\`${song.likes}\``, inline: true },
        { name: "id:", value: `\`${song.id}\``, inline: true },
        { name: "Requester:", value: `${song.user}` },
      )
      .setTimestamp()
      .setFooter({ text: " " });

    await interaction.reply({ embeds: [nowPlaingEmbed] });
  },
};
