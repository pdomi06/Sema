const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js'); 
const { client } = require("../../index.js");

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
		const collection = client.mongos.db("Test").collection("log_channels");

		log_channel = await collection.findOne({guild_id: interaction.guild.id})
		if (log_channel) {
			const successEmbed = new EmbedBuilder() 
			.setColor(0xFF0000) 
			.setTitle("Log system is already installed") 
			.setTimestamp() 
			.setFooter({ text: ' ' });
			await interaction.reply({ embeds: [successEmbed] })
			return;
		}
		try {

			await collection.insertOne({guild_id: interaction.guild.id, log_id:interaction.options.get('channel').value});
			const successEmbed = new EmbedBuilder() 
			.setColor(0x00FF00) 
			.setTitle("Succesfully intalled THE log system") 
			.setTimestamp() 
			.setFooter({ text: ' ' }); 
		await interaction.reply({ embeds: [successEmbed] }) 
		  } catch (error) {
			console.error(error);
		  }
		 
	}, 
};