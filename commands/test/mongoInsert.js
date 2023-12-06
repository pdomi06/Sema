const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { client } = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mongo_insert")
    .setDescription("Insert data into the mongo database.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption(option => option.setName('value')
            .setDescription('message to encode')
            .setRequired(true)),
  async execute(interaction) {
    try {
      const collection = client.mongos.db("Test").collection("Test");
      const data = await collection.insertOne({value: interaction.options.get("value").value});
      interaction.reply(`Working: ${data.acknowledged}`);
    } catch (error) {
      console.error(error);
    }
  },
};
