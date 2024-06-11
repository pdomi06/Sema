const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {

		const msg = message.content
		if (msg.includes("kurva") === true){
			await message.delete()
		}
	},
};