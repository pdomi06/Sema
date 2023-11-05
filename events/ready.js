const { Events } = require('discord.js'); 
 
 
module.exports = { 
	name: Events.ClientReady, 
	once: true, 
	execute(client) { 
 
		async function run() { 
			try { 
				// Connect the client to the server	(optional starting in v4.7) 
				await client.mongos.connect(); 
				// Send a ping to confirm a successful connection 
				await client.mongos.db("admin").command({ ping: 1 }); 
				 
			} finally { 
				// Ensures that the client will close when you finish/error 
				await client.mongos.close(); 
			} 
		} 
		run().catch(console.dir); 
		 
	}, 
}; 
