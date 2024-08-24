const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears messages in a channel."),

  async execute(interaction) {
    try {
      // Get all the messages from the channel and then delete them try without bulkDelete
      const messages = await interaction.channel.messages.fetch();
      await interaction.channel.bulkDelete(messages);
      await interaction.reply({
        content: "Messages have been cleared!",
        ephemeral: true,
      });
    } catch (error) {
      await interaction.reply({
        content: "You cannot delete messages older than 14 days.",
        ephemeral: true,
      });
    }
    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  },
};
