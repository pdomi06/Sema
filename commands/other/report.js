const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const locales = require('../../configs/locales.json')
require('dotenv').config()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Provides informations about the guild.'),
	async execute(interaction) {

		await interaction.reply("Fasizmus van nincs ilyen!")
	},
};