const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { client } = require("../../index.js"); 
 
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
		const testData = client.mongos.db("Test").collection("Test").findOne()
		console.log(testData)
	}, 
};