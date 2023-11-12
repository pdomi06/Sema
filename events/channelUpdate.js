const { Events, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
require("dotenv").config();

module.exports = {
  name: Events.ChannelUpdate,
  async execute(oldChannel, newChannel) {
    const db = new QuickDB();

    const id = await db.get(`${oldChannel.guild.id}.log_id`);
    if (!id) return;

    const ch = oldChannel.client.channels.cache.get(id);
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
