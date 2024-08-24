const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { client } = require("../../index.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips one in the queue"),

  async execute(interaction) {
    const voiceChannel = interaction.member;
    const queue = client.distube.getQueue(interaction);

    if (!voiceChannel) {
      return interaction.reply({
        content: "You must be in a voice channel to use this command.",
        ephemeral: true,
      });
    }

    if (!queue) {
      const noQueueEmbed = new EmbedBuilder()
        .setColor(process.env.RED)
        .setTitle("❌ | There is nothing in the queue")
        .setTimestamp()
        .setFooter({ text: " " });

      return interaction.reply({ embeds: [noQueueEmbed], ephemeral: true });
    }
    try {
      await queue.skip();
      await interaction.reply({ content: "Skipped the song", ephemeral: true });
    } catch (e) {
      interaction.reply(` ${e}`);
    }

    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  },
};
