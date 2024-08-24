const { Events, EmbedBuilder } = require("discord.js");
const { client } = require("../index.js");
require("dotenv").config();

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage, newMessage) {
    if (!oldMessage.content) return;
    if (oldMessage.content === newMessage.content) return;
    if (newMessage.content === "") return;

    const collection = client.mongos.db("Logs").collection("log_channels");
    const id = await collection.findOne({ guild_id: oldMessage.guild.id });

    const ch = newMessage.client.channels.cache.get(id.channel_id);
    const messageUpdateEmbed = new EmbedBuilder()
      .setColor(process.env.YELLOW)
      .setTitle("Message edited")
      .addFields(
        {
          name: "Channel: ",
          value: `<#${newMessage.channelId}>`,
          inline: true,
        },
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
