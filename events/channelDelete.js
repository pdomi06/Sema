const { Events, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
require("dotenv").config();

module.exports = {
  name: Events.ChannelDelete,
  async execute(channel) {
    const db = new QuickDB();

    const collection = client.mongos.db("Logs").collection("log_channels");
    const id = await collection.findOne({ guild_id: channel.guild.id });

    if (!id) return;

    const ch = channel.client.channels.cache.get(id.channel_id);

    if (!ch) return;

    const isTextChannel = channel.type === 0;
    const isVoiceChannel = channel.type === 2;
    if (isTextChannel) {
      const tChDeleteEmbed = new EmbedBuilder()
        .setColor(process.env.RED)
        .setTitle("Channel deleted:")
        .addFields(
          { name: "Name: ", value: channel.name },
          { name: "Type: ", value: "📜text" },
        )
        .setTimestamp()
        .setFooter({ text: " " });
      ch.send({ embeds: [tChDeleteEmbed] });
    } else if (isVoiceChannel) {
      const vChDeleteEmbed = new EmbedBuilder()
        .setColor(process.env.RED)
        .setTitle("Channel deleted:")
        .addFields(
          { name: "Name: ", value: channel.name },
          { name: "Type: ", value: "🔊voice" },
        )
        .setTimestamp()
        .setFooter({ text: " " });
      ch.send({ embeds: [vChDeleteEmbed] });
    }
  },
};
