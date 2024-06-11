const { REST, Routes } = require('discord.js'); 
require('dotenv').config() 
const prompt = require('prompt-sync')(); 
 
const guildId = prompt("Guild? ") 

 
// Construct and prepare an instance of the REST module 
const rest = new REST().setToken(process.env.TOKEN); 
 
// and deploy your commands! 
(async () => { 
	try { 
		 
 
		// The put method is used to fully refresh all commands in the guild with the current set 
		await rest.put( 
			Routes.applicationGuildCommands(process.env.CLIENTID, guildId), 
			{ body: `` }, 
		); 
 
		 
	} catch (error) { 
		// And of course, make sure you catch and log any errors! 
		console.error(error); 
	} 
})();