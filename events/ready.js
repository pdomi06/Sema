const { Events } = require('discord.js'); 
 
module.exports = { 
	name: Events.ClientReady, 
	once: true, 
	execute(client) { 
		console.log(`${client.user.username} logged in with ${client.guilds.cache.size} guilds`);	 
	}, 
}; 
