const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("food")
    .setNameLocalizations({
      hu: "kaja",
    })
    .setDescription("Sends food embed")
    .setDescriptionLocalizations({
      hu: "Elküldi mit ettél",
    })
    .addStringOption((option) =>
      option.setName("reggeli").setDescription("reggeli").setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("ebed").setDescription("ebed").setRequired(true),
    )
    .addStringOption((option) =>
      option.setName("vacsora").setDescription("vacsora").setRequired(true),
    ),
  async execute(interaction) {
    const date = new Date();

    let month;
    if (date.getMonth() + 1 < 10) {
      month = `0${date.getMonth() + 1}`;
    } else {
      month = `${date.getMonth() + 1}`;
    }

    let day;
    if (date.getDate() < 10) {
      day = `0${date.getDate()}`;
    } else {
      day = `${date.getDate()}`;
    }

    const reggeli = interaction.options.get("reggeli").value;
    const ebed = interaction.options.get("ebed").value;
    const vacsora = interaction.options.get("vacsora").value;
    const user_avatar = `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=1024`;

    const foodEmbed = new EmbedBuilder()
      .setColor(process.enb.DEF_COLOR)
      .setTitle(
        `${
          interaction.user.username
        } \`${date.getFullYear()}:${month}:${day}\` napi kajája`,
      )
      .setThumbnail(user_avatar)
      .addFields(
        { name: "Reggeli:", value: reggeli },
        { name: "Ebéd:", value: ebed },
        { name: "Vacsora:", value: vacsora },
      )
      .setTimestamp()
      .setFooter({ text: " " });
    await interaction.reply({ embeds: [foodEmbed] });
  },
};
