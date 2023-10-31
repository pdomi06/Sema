const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('homework_edit')
		.setNameLocalizations({
			hu: 'hazifeladat_edit',
		})
		.setDescription('Sets up the homework embed.')
		.setDescriptionLocalizations({
			hu: 'Elkészíti a házi embedet.'
		})
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels,),
	async execute(interaction) {
		const embedMessage = await interaction.channel.messages.fetch();
		console.log(embedMessage)
		await interaction.reply({ embeds: [embedMessage.embeds]})
	},
};