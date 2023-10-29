const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const locales = require('../../configs/locales.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user_informations')
		.setNameLocalizations({
			hu: 'felhasználói_információk',
		})
		.setDescription('Provides information about the user.')
		.setDescriptionLocalizations({
			hu: 'Felhasználórol nyújt információkat.'
		})
		.addUserOption(option => option.setName('user').setNameLocalizations({
			hu: 'felhasználó'
		}).setDescription('Choose user to get informations.').setDescriptionLocalizations({
			hu: 'Válaszd ki azt a felhasználót akiről az információkat szeretnéd.'
		}).setRequired(true))
		.addBooleanOption(option => option.setName('ephemeral').setNameLocalizations({
			hu: "privát"
		}).setDescription('Whether or not the echo should be ephemeral').setDescriptionLocalizations({
			hu: "Szeretnéd hogy mások is lássák"
		}).setRequired(true)),
	async execute(interaction) {
		const profile = locales[`${interaction.locale}_userjs_profile`] ?? "'s profile"
		const id = locales[`${interaction.locale}_userjs_id`] ?? "Id"
		const nickname = locales[`${interaction.locale}_userjs_nickname`] ?? "Nickname"
		const Tag = locales[`${interaction.locale}_userjs_tag`] ?? "Tag"
		const bot = locales[`${interaction.locale}_userjs_bot`] ?? "Bot"
		const joinedAt = locales[`${interaction.locale}_userjs_joinedAt`] ?? "Joined to the server"
		const createdAt = locales[`${interaction.locale}_userjs_createdAt`] ?? "Account created at"

		const mentioned = interaction.options.get('user')
		const ephemeral_option = interaction.options.get('ephemeral')
		const user_avatar = `https://cdn.discordapp.com/avatars/${mentioned.user.id}/${mentioned.user.avatar}.png?size=1024`
	
		const userEmbed = new EmbedBuilder()
			.setColor(0xFFFFFF)
			.setTitle(`${mentioned.user.username}${profile}`)
			.setThumbnail(user_avatar)
			.addFields(
				{ name: `🪪 | ${id}: `, value: `${mentioned.user.id}` },
				{ name: `🧑 | ${nickname}: `, value: `${mentioned.member.nickname}` },
				{ name: `🏷️ | ${Tag}: `, value: `${mentioned.user.discriminator}` },
				{ name: `🤖 | ${bot}? `, value: `${mentioned.user.bot}` },
				{ name: `📅 | ${joinedAt}: `, value: new Date(mentioned.member.joinedAt).toLocaleDateString() },
				{ name: `📅 | ${createdAt}: `, value: new Date(mentioned.user.createdAt).toLocaleDateString() },
			)
			.setTimestamp()
			.setFooter({ text: ' ', iconURL: user_avatar });
		await interaction.reply({ embeds: [userEmbed], ephemeral:  ephemeral_option.value })
	},
};