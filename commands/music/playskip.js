const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
const config = require("../../configs/config.json")


module.exports = {
  data: new SlashCommandBuilder()
    .setName('playskip')
    .setDescription('Adds a new song to the queue and skip one.')
    .addStringOption(option => option.setName('music')
      .setDescription('The URL or title of the song to play')
      .setRequired(true)),

      async execute(interaction) {
        const song = interaction.options.get('music').value;
        const member = interaction.member;
        const voiceChannel = member.voice.channel;
      
        if (!voiceChannel) {
          return interaction.reply({ content: "You must be in a voice channel to use this command.", ephemeral: true });
        }
      
        const queue = client.distube.getQueue(interaction.guildId);
      
        try {
      
            await client.distube.play(voiceChannel, song, { textChannel: interaction.channel, member: member });
            await queue.skip()

      
            const playEmbed = new EmbedBuilder()
            .setColor(config.green)
            .setTitle(` ✅ | Preparing song: `)
            .setDescription(song)
            .setTimestamp()
            .setFooter({ text: ' ' });

          return interaction.reply({ embeds: [playEmbed] });
        } catch (error) {
          console.error(error);
          return interaction.reply({ content: '❌ Error executing command.', ephemeral: true });
        }
      }
      
};