module.exports = {
	name: "searchNoResult",
	async execute(message, query) {
		await message.channel.send(` No result found for \`${query}\`!`)
	},
};