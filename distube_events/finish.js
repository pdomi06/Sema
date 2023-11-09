module.exports = {
  name: "finish",
  async execute(queue) {
    queue.textChannel.send("Finished!");
  },
};
