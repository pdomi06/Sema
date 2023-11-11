const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    async function run() {
      try {
        // Connect the client to the server (optional starting in v4.7)
        await client.mongos.connect();
        // Send a ping to confirm a successful connection
        await client.mongos.db("admin").command({ ping: 1 });
        console.log(
          `${client.user.username} logged in with ${client.guilds.cache.size} guilds`,
        ); // Add this line
      } catch (error) {
        console.error(error);
      }
    }
    run().catch(console.dir);
  },
};
