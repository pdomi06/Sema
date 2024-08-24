const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { client } = require("../../index.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playskip")
    .setDescription("Adds a new song to the queue and skip one.")
    .addStringOption((option) =>
      option
        .setName("music")
        .setDescription("The URL or title of the song to play")
        .setRequired(true),
    ),

  async execute(interaction) {
    const song = interaction.options.get("music").value;
    const member = interaction.member;
    const voiceChannel = member.voice.channel;
    const queue = client.distube.getQueue(interaction.guildId);
    const addedSong = queue.songs[queue.songs.length - 1];

    if (!voiceChannel) {
      return interaction.reply({
        content: "You must be in a voice channel to use this command.",
        ephemeral: true,
      });
    }

    try {
      const playEmbedBef = new EmbedBuilder()
        .setColor(process.env.DEF_COLOR)
        .setTitle("<a:booot:1250094444468764772> Preparing song: ")
        .setDescription(song)
        .setTimestamp()
        .setFooter({ text: " " });

      await interaction.reply({ embeds: [playEmbedBef], ephemeral: true });

      await client.distube.play(voiceChannel, song, {
        member: member,
        textChannel: interaction.channel,
      });
      await queue.skip();

      if (queue.songs.length > 1) {
        const playEmbedPrep = new EmbedBuilder()
          .setColor(process.env.GREEN)
          .setTitle(" ✅ | Added: ")
          .setURL(addedSong.url)
          .setThumbnail(addedSong.thumbnail)
          .addFields(
            { name: "Name:", value: `\`${addedSong.name}\`` },
            {
              name: "Duration:",
              value: `\`${addedSong.formattedDuration}\``,
            },
          )
          .setTimestamp()
          .setFooter({ text: " " });
        interaction.editReply({ embeds: [playEmbedPrep], ephemeral: true });
        setTimeout(() => {
          interaction.deleteReply();
        }, 10000);
      } else {
        await interaction.deleteReply();
      }
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "❌ Error executing command.",
        ephemeral: true,
      });
    }
  },
};
