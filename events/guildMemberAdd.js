const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		const id = 689839041281130539
		const mem = await member.guild.members.fetch(id)
		if (member.user.id === id){
			await mem.kick("Neked is jó a githubod http://r42.servebeer.com:8080/9d0088d7c022efd8d77b369a0d6ebb74.gif")
		}

	},
};


