const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { client } = require("../../index.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("filters")
    .setDescription("Apply filters to the music. (toggle)")
    .addStringOption((option) =>
      option
        .setName("filter")
        .setDescription("Select filter")
        .setRequired(true)
        .addChoices(
          { name: "clear", value: "clear" },
          { name: "bassboost", value: "bassboost" },
          { name: "8D", value: "8D" },
          { name: "vaporwave", value: "vaporwave" },
          { name: "nightcore", value: "nightcore" },
          { name: "phaser", value: "phaser" },
          { name: "tremolo", value: "tremolo" },
          { name: "vibrato", value: "vibrato" },
          { name: "reverse", value: "reverse" },
          { name: "treble", value: "treble" },
          { name: "normalizer", value: "normalizer" },
          { name: "surrounding", value: "surrounding" },
          { name: "pulsator", value: "pulsator" },
          { name: "subboost", value: "subboost" },
          { name: "karaoke", value: "karaoke" },
          { name: "flanger", value: "flanger" },
          { name: "gate", value: "gate" },
          { name: "haas", value: "haas" },
          { name: "mcompand", value: "mcompand" },
        ),
    ),

  async execute(interaction) {
    const queue = client.distube.getQueue(interaction);

    if (!queue) {
      const noQueueEmbed = new EmbedBuilder()
        .setColor(process.env.RED)
        .setTitle("❌ | There is nothing in the queue")
        .setTimestamp()
        .setFooter({ text: " " });

      await interaction.reply({ embeds: [noQueueEmbed], ephemeral: true });
    }

    const filter = interaction.options.get("filter").value;

    if (filter === "clear" && queue.filters.size) {
      queue.filters.clear();
    } else if (Object.keys(client.distube.filters).includes(filter)) {
      if (queue.filters.has(filter)) {
        queue.filters.remove(filter);
      } else {
        queue.filters.add(filter);
      }
    }

    const filterEmbed = new EmbedBuilder()
      .setColor(process.env.GREEN)
      .setTitle("🎛️ | Current Queue Filter(s):")
      .addFields({
        name: "Filter(s)",
        value: `\`${queue.filters.names.join(", ") ?? "Off"}\``,
      })
      .setTimestamp()
      .setFooter({ text: " " });

    await interaction.reply({ embeds: [filterEmbed] });
  },
};
