const { Events, EmbedBuilder } = require("discord.js");
const { client } = require("../index.js");
require("dotenv").config();

module.exports = {
  name: Events.MessageDelete,
  async execute(message) {
    if (message.content === ``) return;
    const collection = client.mongos.db("Logs").collection("log_channels");
    const id = await collection.findOne({ guild_id: message.guild.id });

    const ch = message.client.channels.cache.get(id.channel_id);
    const messageDeleteEmbed = new EmbedBuilder()
      .setColor(process.env.RED)
      .setTitle("Message deleted")
      .addFields(
        { name: "Channel: ", value: `<#${message.channelId}>`, inline: true },
        {
          name: "Msg Author: ",
          value: `<@${message.author.id}>`,
          inline: true,
        },
        { name: "Message: ", value: `\`${message.content}\`` },
      )
      .setTimestamp()
      .setFooter({ text: " " });
    ch?.send({ embeds: [messageDeleteEmbed] });
  },
};
