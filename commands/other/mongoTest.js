const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { client } = require("../../index.js"); 
 
module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('mongo_test') 
		.setDescription('Tests the mongo connection between cluster and app.') 
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels,), 
	async execute(interaction) {
		try {
			const collection = client.mongos.db("Test").collection("Test");
			await collection.findOne()
		} catch (error) {
			console.error(error);
		} finally {
			interaction.reply("Working");
		}
	}

	};