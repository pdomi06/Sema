module.exports = {
  name: "empty",
  async execute(channel) {
    await channel.send("Voice channel is empty! Leaving the channel...");
  },
};
