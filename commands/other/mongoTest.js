const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { client } = require("../../index.js"); 
 
module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('mongo_test') 
		.setNameLocalizations({ 
			hu: 'hazifeladat_edit', 
		}) 
		.setDescription('Sets up the homework embed.') 
		.setDescriptionLocalizations({ 
			hu: 'Elkészíti a házi embedet.' 
		}) 
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels,), 
	async execute(interaction) {
		try {
			const collection = client.mongos.db("Test").collection("Test");
			const testData = await collection.findOne()
			console.log(testData)
		} catch (error) {
			console.error(error);
		} finally {
			interaction.reply("Working");
		}
	}

	};