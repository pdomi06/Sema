const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const locales = require("../../configs/locales.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventory")
    .setNameLocalizations({
      hu: "leltar",
    })
    .setDescription("Shows your invetory.")
    .setDescriptionLocalizations({
      hu: "Megmutatja a leltáradat.",
    }),
  async execute(interaction) {
    const { QuickDB } = require("quick.db");
    const db = new QuickDB();

    const inventory =
      (await db.get(`${interaction.user.id}.inventory`)) ?? "empty";

    const prof =
      locales[`${interaction.locale}_inventoryjs_profile`] ?? "'s inventory";
    const coin = locales[`${interaction.locale}_inventoryjs_items`] ?? "Items";
    const user_avatar = `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png?size=1024`;

    const inventoryEmbed = new EmbedBuilder()
      .setColor(0x4d2d82)
      .setThumbnail(user_avatar)
      .setTitle(`${interaction.user.username}${prof}`)
      .setFields({ name: coin, value: `${inventory}` })
      .setTimestamp()
      .setFooter({ text: " " });
    await interaction.reply({ embeds: [inventoryEmbed] });
  },
};
