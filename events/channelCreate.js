const { Events, EmbedBuilder } = require("discord.js");
const { client } = require("../index.js");
require("dotenv").config();

module.exports = {
  name: Events.ChannelCreate,
  async execute(channel) {
    const collection = client.mongos.db("Logs").collection("log_channels");
    const id = await collection.findOne({ guild_id: channel.guild.id });

    if (!id) return;
    const ch = channel.client.channels.cache.get(id.channel_id);
    if (!ch) return;

    const isTextChannel = channel.type === 0;
    const isVoiceChannel = channel.type === 2;

    if (isTextChannel) {
      const tChCreateEmbed = new EmbedBuilder()
        .setColor(process.env.GREEN)
        .setTitle("Channel created:")
        .addFields(
          { name: "Name: ", value: `<#${channel.id}>` },
          { name: "Type: ", value: "📜text" },
        )
        .setTimestamp()
        .setFooter({ text: " " });
      ch.send({ embeds: [tChCreateEmbed] });
    } else if (isVoiceChannel) {
      const vChCreateEmbed = new EmbedBuilder()
        .setColor(process.env.GREEN)
        .setTitle("Channel created:")
        .addFields(
          { name: "Name: ", value: `<#${channel.id}>` },
          { name: "Type: ", value: "🔊voice" },
        )
        .setTimestamp()
        .setFooter({ text: " " });
      ch.send({ embeds: [vChCreateEmbed] });
    }
  },
};
