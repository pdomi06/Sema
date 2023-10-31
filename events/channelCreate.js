const { Events, EmbedBuilder } = require('discord.js');
require('dotenv').config()

module.exports = {
	name: Events.ChannelCreate,
	async execute(channel) {
		const { QuickDB } = require("quick.db");
		const db = new QuickDB();

		let id = await db.get(`${channel.guild.id}.log_id`)
		if (!id) return;
		const ch = channel.client.channels.cache.get(id)
		if (!ch) return;

		const isTextChannel = channel.type === 0;
		const isVoiceChannel = channel.type === 2;

		 if (isTextChannel) {

			const tChCreateEmbed = new EmbedBuilder()
			.setColor(process.env.GREEN)
			.setTitle(`Channel created:`)
			.addFields(
				{ name: "Name: ", value: `<#${channel.id}>` },
				{ name: "Type: ", value: "📜text" }
				)
			.setTimestamp()
			.setFooter({ text: ' ' });
			ch.send({ embeds: [tChCreateEmbed] })
	
		} else if (isVoiceChannel) {
			const vChCreateEmbed = new EmbedBuilder()
			.setColor(process.env.GREEN)
			.setTitle(`Channel created:`)
			.addFields(
				{ name: "Name: ", value: `<#${channel.id}>` },
				{ name: "Type: ", value: "🔊voice" }
				)
			.setTimestamp()
			.setFooter({ text: ' ' });
			ch.send({ embeds: [vChCreateEmbed] })
	
		}

	},
};