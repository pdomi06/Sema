const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { client } = require("../../index.js");
require('dotenv').config()


module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('asd')
    .addStringOption(option => option.setName('music')
      .setDescription('The URL or title of the song to play')
      .setRequired(true)),

      async execute(interaction) {
        const song = interaction.options.getString('music');
        const member = interaction.member;
        const voiceChannel = member.voice.channel;
      
        if (!voiceChannel) {
          return interaction.reply({ content: "You must be in a voice channel to use this command.", ephemeral: true });
        }
      
        const queue = client.distube.getQueue(interaction.guildId);
      
        try {
      
            let result = client.distube.search(song)
            console.log(result)
            const playEmbed = new EmbedBuilder()
            .setColor(process.env.GREEN)
            .setTitle(` ✅ | Preparing song: `)
            .setDescription(song)
            .setTimestamp()
            .setFooter({ text: ' ' });

         interaction.reply({ embeds: [playEmbed], ephemeral: true });
        } catch (error) {
          console.error(error);
           interaction.reply({ content: '❌ Error executing command.', ephemeral: true });
        }

        setTimeout(() => {
          interaction.deleteReply();
        }, 5000);
      }
      
};
