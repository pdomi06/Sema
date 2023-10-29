module.exports = {
	name: "addList",
	async execute(queue, playlist) {
		queue.textChannel.send(
			` Added \`${playlist.name}\` playlist (${
			  playlist.songs.length
			} songs) to queue\n${status(queue)}`
		  )
	},
};