const { SlashCommandBuilder } = require('discord.js');
const { client } = require("../../index.js");

module.exports = {
    data: new SlashCommandBuilder()
      .setName('reverse')
      .setDescription('Reverse 10 sec'),
  
        async execute(interaction) {
          const queue = client.distube.getQueue(interaction)
          const time = 10
          queue.seek((queue.currentTime - time))

          await interaction.reply({content: "Reversed 10 sec", ephemeral: true })
          setTimeout(() => {
            interaction.deleteReply();
          }, 5000);
        }
        
  };
      

