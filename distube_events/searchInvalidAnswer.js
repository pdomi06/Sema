const { client } = require("../index.js"); 

module.exports = {
	name: "searchInvalidAnswer",
	async execute(message) {
		await message.channel.send(
			`${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
		 )
	},
};