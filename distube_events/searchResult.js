module.exports = {
	name: "searchResult",
	async execute(message, result) {
		let i = 0
		await message.channel.send(
		   `**Choose an option from below**\n${result
			  .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
			   .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
	   )
	},
};