const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js'); 
 
module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('homework_setup') 
		.setNameLocalizations({ 
			hu: 'hazifeladat_setup', 
		}) 
		.setDescription('Sets up the homework embed.') 
		.setDescriptionLocalizations({ 
			hu: 'Elkészíti a házi embedet.' 
		}) 
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels,), 
	async execute(interaction) { 
		const homeworkEmbed = new EmbedBuilder() 
		.setColor(0xFFFFFF) 
		.setTitle("Házi feladatok") 
		.addFields( 
			{ name: "Nyelvtan", value: "Nincs" }, 
			{ name: "Irodalom", value: "Nincs" }, 
			{ name: "Matek", value: "Nincs" }, 
			{ name: "Távgyak", value: "Nincs" }, 
			{ name: "Digi", value: "Nincs" }, 
			{ name: "Projekt", value: "Nincs" }, 
			{ name: "Történelem", value: "Nincs" }, 
			{ name: "Pénzügy", value: "Nincs" }, 
			{ name: "Fizika", value: "Nincs" }, 
			{ name: "Angol", value: "Nincs" }, 
			{ name: "Proggy", value: "Nincs" }, 
		) 
		.setTimestamp() 
		.setFooter({ text: 'Frissítve ' }); 
		await interaction.reply({ embeds: [homeworkEmbed] }) 
		 
	}, 
};