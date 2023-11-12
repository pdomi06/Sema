const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { client } = require("../../index.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leaves the channel."),

  async execute(interaction) {
    client.distube.voices.leave(interaction);

    const leaveEmbed = new EmbedBuilder()
      .setColor(process.env.GREEN)
      .setTitle("💣 | Disconnect")
      .setTimestamp()
      .setFooter({ text: " " });

    await interaction.reply({ embeds: [leaveEmbed] });
  },
};
