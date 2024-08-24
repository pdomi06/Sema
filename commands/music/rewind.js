const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { client } = require("../../index.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rewind")
    .setDescription("Rewinds in the song for a specific interval.")
    .addIntegerOption((option) =>
      option
        .setName("seconds")
        .setDescription("secs to rewind")
        .setRequired(true),
    ),

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
    const time = Number(interaction.options.get("seconds").value);

    queue.seek(queue.currentTime - time);
    interaction.reply(`Rewinded the song for ${time}!`);
  },
};
