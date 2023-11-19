const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "playSong",
  async execute(queue, song) {
    const row1 = new ActionRowBuilder();
    const row2 = new ActionRowBuilder();

    row1.addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setEmoji("⏮️")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("reverse")
        .setEmoji("⏪")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("pause")
        .setEmoji("⏯️")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("forward")
        .setEmoji("⏩")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("skip")
        .setEmoji("⏭️")
        .setStyle(ButtonStyle.Primary),
    );
    //		row2.addComponents(
    //			new ButtonBuilder()
    //				.setCustomId("autoplay")
    //				.setEmoji("📻")
    //				.setStyle(ButtonStyle.Primary),
    //			new ButtonBuilder()
    //				.setCustomId("speedup")
    //				.setEmoji("🚀")
    //				.setStyle(ButtonStyle.Primary),
    //			new ButtonBuilder()
    //				.setCustomId("slowmo")
    //				.setEmoji("♿")
    //				.setStyle(ButtonStyle.Primary),
    //		)

    const playingEmbed = new EmbedBuilder()
      .setColor(process.env.DEF_COLOR)
      .setTitle(" 🎶 | Playing")
      .setURL(song.url)
      .setThumbnail(song.thumbnail)
      .addFields(
        { name: "Name:", value: `\`${song.name}\``, inline: true },
        {
          name: "Duration:",
          value: `|\`${song.formattedDuration}\`|`,
          inline: true,
        },
        { name: "Requester:", value: `${song.user}`, inline: true },
        {
          name: "Filters:",
          value: `\`${queue.filters.names.join(", ") ?? "None"}\``,
        },
        {
          name: "Volume:",
          value: `\`${queue.volume}%\``,
          inline: true
        },
        {
          name: "Loop:",
          value: `\`${
            queue.repeatMode
              ? queue.repeatMode === 2
                ? "All Queue"
                : "This Song"
              : "Off"
          }\``,
          inline: true
        },
        {
          name: "Queue:",
          value: `Autoplay: \`${queue.autoplay ? "✅" : "❌"}\``,
          inline: true
        },
      )
      .setTimestamp()
      .setFooter({ text: " " });
    await queue.textChannel.send({
      embeds: [playingEmbed],
      components: [row1],
    });
  },
};
