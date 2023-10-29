const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require("../../configs/config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('food')
		.setNameLocalizations({
			hu: 'kaja',
		})
		.setDescription('Sends food embed')
		.setDescriptionLocalizations({
			hu: 'Elküldi mit ettél'
		})
		.addStringOption(option => option.setName('reggeli')
		.setDescription('reggeli')
		.setRequired(true))
		.addStringOption(option => option.setName('ebed')
		.setDescription('ebed')
		.setRequired(true))
		.addStringOption(option => option.setName('vacsora')
		.setDescription('vacsora')
		.setRequired(true)),
	async execute(interaction) {
		const d = new Date()

		let month;
		if (d.getMonth() + 1 < 10) {
			month = `0${d.getMonth() + 1}`;
		} else {
			month = `${d.getMonth() + 1}`;
		}
		
		let day;
		if (d.getDate() < 10) {
			day = `0${d.getDate()}`;
		} else {
			day = `${d.getDate()}`;
		}
		 
		const reggeli = interaction.options.get('reggeli').value
		const ebed = interaction.options.get('ebed').value
		const vacsora = interaction.options.get('vacsora').value
		const user_avatar = `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=1024`
		
		const foodEmbed = new EmbedBuilder()
			.setColor(config.def_color)
			.setTitle(`${interaction.user.username} \`${d.getFullYear()}:${month}:${day}\` napi kajája`)
			.setThumbnail(user_avatar)
			.addFields(
				{ name: `Reggeli:`, value: reggeli },
				{ name: `Ebéd:`, value: ebed },
				{ name: `Vacsora:`, value: vacsora },

			)
			.setTimestamp()
			.setFooter({ text: ' ' });
		await interaction.reply({ embeds: [foodEmbed] })
	},
};