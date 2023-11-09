module.exports = {
  name: "searchNoResult",
  async execute(message, query) {
    message.channel.send(` No result found for \`${query}\`!`);
  },
};
