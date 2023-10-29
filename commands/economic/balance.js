const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const locales = require('../../configs/locales.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setNameLocalizations({
			hu: 'egyenleg',
		})
		.setDescription('Shows your balance.')
		.setDescriptionLocalizations({
			hu: 'Megmutatja az egyenlegedet.'
		}),
	async execute(interaction) {
		const { QuickDB } = require("quick.db");
		const db = new QuickDB();

		const balC = await db.get(`${interaction.user.id}.balance`) ?? "0"
		
		const prof = locales[`${interaction.locale}_balancejs_profile`] ?? "'s balance"
		const coin = locales[`${interaction.locale}_balancejs_coin`] ?? "Coins"
		const user_avatar = `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=1024`

		const balanceEmbed = new EmbedBuilder()
		.setColor(0x4D2D82)
		.setThumbnail(user_avatar)
		.setTitle(`${interaction.user.username}${prof}`)
		.setFields(
			{ name: coin, value: `${balC}`}
		)
		.setTimestamp()
		.setFooter({ text: ' ' });
		await interaction.reply({ embeds: [balanceEmbed] })
		
	},
};


