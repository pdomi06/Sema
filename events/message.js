const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	async execute(message) {

		msg = message.content
		if (msg.includes("kurva") === true){
			message.delete()
		}
	},
};