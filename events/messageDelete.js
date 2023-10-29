const { Events, EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");

module.exports = {
	name: Events.MessageDelete,
	async execute(message) {
		const db = new QuickDB();

		let id = await db.get(`${message.guild.id}.log_id`)
		const ch = message.client.channels.cache.get(id)
			const messageDeleteEmbed = new EmbedBuilder()
			.setColor(0x870707)
			.setTitle(`Message deleted`)
			.addFields(
				{ name: "Channel: ", value: `<#${message.channelId}>`, inline: true },
				{ name: "Msg Author: ", value: `<@${message.author.id}>`, inline: true },
				{ name: "Message: ", value: `\`${message.content}\`` },
				
				)
			.setTimestamp()
			.setFooter({ text: ' ' });
			ch?.send({ embeds: [messageDeleteEmbed] })
		

	},
};