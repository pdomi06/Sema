module.exports = {
	name: "finish",
	async execute(queue) {
        console.log("finish")
        queue.textChannel.send('Finished!')
	},
};