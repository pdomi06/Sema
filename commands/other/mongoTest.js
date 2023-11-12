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
			const result = await collection.findOne()
			interaction.reply(`Working: ${result.Test}`);
		} catch (error) {
			console.error(error);
		} 
	}

	};