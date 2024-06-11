const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const locales = require('../../configs/locales.json')
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guild_informations')
		.setNameLocalizations({
			hu: 'szerver_információk',
		})
		.setDescription('Provides informations about the guild.')
		.setDescriptionLocalizations({
			hu: 'Szerverről nyújt információkat.'
		}),
	async execute(interaction) {
		//const guild_pic = `https://cdn.discordapp.com/avatars/${interaction.guild.id}/${interaction.guild.icon}.png?size=1024`

		const profile = locales[`${interaction.locale}_guildjs_profile`] ?? " guild infos"
		const id = locales[`${interaction.locale}_guildjs_id`] ?? "Id"
		const owner = locales[`${interaction.locale}_guildjs_owner`] ?? "Owner"
		const memberCount = locales[`${interaction.locale}_guildjs_memberCount`] ?? "Member count"
		const afkTimeout = locales[`${interaction.locale}_guildjs_afkTimeout`] ?? "AFK timeout"
		const afkChannel = locales[`${interaction.locale}_guildjs_afkChannel`] ?? "AFK channel"
		const premiumCount = locales[`${interaction.locale}_guildjs_premiumCount`] ?? "Server boost count"
		const premiumTier = locales[`${interaction.locale}_guildjs_premiumTier`] ?? "Server boost tier"
		const createdAt = locales[`${interaction.locale}_guildjs_createdAt`] ?? "Server created at"

	

		const guildEmbed = new EmbedBuilder()
			.setColor(process.env.GREEN)
			.setTitle(`${interaction.guild.name}${profile}`)
			.addFields(
				{ name: `🪪 | ${id}: `, value: `${interaction.guild.id}`, inline: true },
				{ name: `🧑 | ${owner}: `, value: `<@${interaction.guild.ownerId}>`, inline: true },
				{ name: `#️⃣ | ${memberCount}: `, value: `${interaction.guild.memberCount}`, inline: true },
				{ name: `💤 | ${afkTimeout}: `, value: `${interaction.guild.afkTimeout/60}`, inline: true },
				{ name: `🛏️ | ${afkChannel}: `, value: `<#${interaction.guild.afkChannelId}>`, inline: true },
				{ name: `💎 | ${premiumCount}: `, value: `${interaction.guild.premiumSubscriptionCount}`, inline: true },
				{ name: `💍 | ${premiumTier}: `, value: `${interaction.guild.premiumTier}`, inline: true },
				{ name: `📅 | ${createdAt}: `, value: new Date(interaction.guild.joinedTimestamp).toLocaleDateString(), inline: true },
			)
			.setTimestamp()
			.setFooter({ text: ' ', iconURL: `https://cdn.discordapp.com/avatars/338739294753783818/${interaction.user.avatar}.png?size=1024` });
		await interaction.reply({ embeds: [guildEmbed], ephemeral: false })
	},
};