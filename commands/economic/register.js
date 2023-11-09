const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 
const locales = require('../../configs/locales.json') 
 
module.exports = { 
	data: new SlashCommandBuilder() 
		.setName('regist') 
		.setNameLocalizations({ 
			hu: 'karakter_letrehozas', 
		}) 
		.setDescription('Creats your character.') 
		.setDescriptionLocalizations({ 
			hu: 'Létre hozza a karaktered.' 
		}), 
	async execute(interaction) { 
		const { QuickDB } = require("quick.db"); 
		const db = new QuickDB(); 
 
		setup = await db.get(`${interaction.user.id}.setup`) 
 
		if (setup === undefined || setup === false) { 
 
			await db.set(`${interaction.user.id}`, { 
				balance: 0, 
				matts: { 
					wood: 0,  
					stone: 0,  
					coal: 0, 
					 
				}, 
				 
				interaction_access: true, 
				working: false, 
				setup: true, 
				work_finish: 0  
				}) 
 
			 
			await interaction.reply("Done") 
		} else { 
			await interaction.reply("You already registered") 
		} 
	}, 
};