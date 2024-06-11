const { Events, EmbedBuilder } = require("discord.js");
const { client } = require("../index.js");
require("dotenv").config();

module.exports = {
  name: Events.ChannelUpdatee, // <------------- the reason why it's not working
  async execute(oldChannel, newChannel) {


    const collection = client.mongos.db("Logs").collection("log_channels");
    const id = await collection.findOne({ guild_id: oldChannel.guild.id });
    if (!id) return;

    const ch = oldChannel.client.channels.cache.get(id.channel_id);
    if (!ch) return;

    const chUpdateEmbed = new EmbedBuilder()
      .setColor(process.env.YELLOW)
      .setTitle("Channel updated:")
      .addFields({ name: "Name ", value: `<#${newChannel.id}>` })
      .setTimestamp()
      .setFooter({ text: " " });
    ch.send({ embeds: [chUpdateEmbed] });
  },
};
