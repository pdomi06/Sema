const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { client } = require("../../index.js");
const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.GENIUS_API);
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Shows the lyrics of the current playing song."),

  async execute(interaction) {
    const queue = client.distube.getQueue(interaction);

    if (!queue) {
      const noQueueEmbed = new EmbedBuilder()
        .setColor(process.env.RED)
        .setTitle("❌ | There is no queue")
        .setTimestamp()
        .setFooter({ text: " " });

      return interaction.reply({ embeds: [noQueueEmbed] });
    }

    const loadingLyricsEmbed = new EmbedBuilder()
      .setColor(process.env.DEF_COLOR)
      .setTitle("<a:booot:1250094444468764772> Loading lyrics ")
      .setTimestamp()
      .setFooter({ text: " " });

    await interaction.reply({ embeds: [loadingLyricsEmbed], ephemeral: true });

    let lyrics = null;
    const title = queue.songs[0].name;
    try {
      const searches = await Client.songs.search(title);
      const firstSong = searches[0];
      lyrics = await firstSong.lyrics();
      if (!lyrics) lyrics = "No lyrics found.";
    } catch (error) {
      lyrics = "No lyrics found (error).";
      console.log(error);
    }

    const lyricsEmbed = new EmbedBuilder()
      .setTitle(`${title}`)
      .setDescription(
        lyrics.length >= 4096 ? `${lyrics.substr(0, 4093)}...` : lyrics,
      )
      .setColor(process.env.DEF_COLOR)
      .setTimestamp();

    return interaction
      .editReply({ content: "", embeds: [lyricsEmbed] })
      .catch(console.error);
  },
};
