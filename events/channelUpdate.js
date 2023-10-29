const { Events, EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const config = require("../configs/config.json")

module.exports = {
	name: Events.ChannelUpdate,
	async execute(oldChannel, newChannel) {
		const db = new QuickDB();

		let id = await db.get(`${oldChannel.guild.id}.log_id`)
		if (!id) return;


		const ch = oldChannel.client.channels.cache.get(id)
		if (!ch) return;
		
			const chUpdateEmbed = new EmbedBuilder()
			.setColor(config.yellow)
			.setTitle(`Channel updated:`)
			.addFields({ name: "Name ", value: `<#${newChannel.id}>` })
			.setTimestamp()
			.setFooter({ text: ' ' });
			ch.send({ embeds: [chUpdateEmbed] })


	},
};