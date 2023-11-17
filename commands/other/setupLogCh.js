const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js'); 
 
module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('setup_log') 
		.setNameLocalizations({ 
			hu: 'log_telepites', 
		}) 
		.setDescription('Installs the log system.') 
		.setDescriptionLocalizations({ 
			hu: 'Fel telepíti a log rendszert.' 
		}) 
		.addChannelOption(option => option.setName('channel').setNameLocalizations({ 
			hu: "csatorna" 
		}).setDescription('Select log channel').setDescriptionLocalizations({ 
			hu: "Válaszd ki a log csatornát" 
		}).setRequired(true)) 
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers), 
	async execute(interaction) { 
		const { QuickDB } = require("quick.db"); 
		const db = new QuickDB(); 
 
		await db.set(`${interaction.guild.id}`, { log_id: interaction.options.get('channel').value }); 
		 
		const successEmbed = new EmbedBuilder() 
			.setColor(0x00FF00) 
			.setTitle("Succesfully intalled THE log system") 
			.setTimestamp() 
			.setFooter({ text: ' ' }); 
		await interaction.reply({ embeds: [successEmbed] }) 
	}, 
};