const { client } = require("../../index.js"); 

module.exports = {
	name: "searchCancel",
	async execute(message) {
		message.channel.send(`${client.emotes.error} | Searching canceled`)
	},
};