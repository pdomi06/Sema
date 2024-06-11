module.exports = { 
	name: "finish", 
	async execute(queue) { 
        await queue.textChannel.send('Finished!') 
	}, 
};