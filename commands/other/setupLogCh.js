const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { client } = require("../../index.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup_log")
    .setNameLocalizations({
      hu: "log_telepites",
    })
    .setDescription("Installs the log system.")
    .setDescriptionLocalizations({
      hu: "Fel telepíti a log rendszert.",
    })
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setNameLocalizations({
          hu: "csatorna",
        })
        .setDescription("Select log channel")
        .setDescriptionLocalizations({
          hu: "Válaszd ki a log csatornát",
        })
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const guild = interaction.guild.id;
	const channel = interaction.options.get("channel").value;
    try {
      const collection = client.mongos.db("Logs").collection("log_channels");
      const result = await collection.findOne({ guild_id: guild });
      if (result) {
        const embed = new EmbedBuilder()
		  .setTitle("Log system already installed")
		  .setColor(process.env.RED)
		  .setDescription(`Log channel: <#${result.channel_id}>`);
		interaction.reply({ embeds: [embed], ephemeral: true});
      } else {
        await collection.insertOne({ guild_id: guild, channel_id: channel });
        const embed = new EmbedBuilder()
          .setTitle("Log system installed")
          .setColor(process.env.GREEN)
          .setDescription(`Log channel: <#${channel}>`);

		interaction.reply({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);
	  interaction.reply({ content: "An error occured", ephemeral: true });
    }
  },
};
