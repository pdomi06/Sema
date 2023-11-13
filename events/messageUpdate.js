const { Events, EmbedBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage, newMessage) {
    const db = new QuickDB();

    const id = await db.get(`${newMessage.guild.id}.log_id`);
    const ch = message.client.channels.cache.get(id);
    const messageUpdateEmbed = new EmbedBuilder()
      .setColor(process.env.YELLOW)
      .setTitle("Message edited")
      .addFields(
        { name: "Channel: ", value: `<#${newMessage.channelId}>`, inline: true },
        {
          name: "Msg Author: ",
          value: `<@${newMessage.author.id}>`,
          inline: true,
        },
        { name: "Original: ", value: `\`${oldMessage.content}\`` },
        { name: "New: ", value: `\`${newMessage.content}\`` },
      )
      .setTimestamp()
      .setFooter({ text: " " });
    ch?.send({ embeds: [messageUpdateEmbed] });
  },
};
