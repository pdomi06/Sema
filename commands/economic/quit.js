const { SlashCommandBuilder, EmbedBuilder, Invite } = require("discord.js");
const locales = require("../../configs/locales.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quit")
    .setNameLocalizations({
      hu: "felmond",
    })
    .setDescription("Stop a process that you no longer want.")
    .setDescriptionLocalizations({
      hu: "Hagyj abba egy folyamatot, amit már nem szeretnél csinálni.",
    })
    .addStringOption((option) =>
      option
        .setName("confirm")
        .setNameLocalizations({
          hu: "megerősítés",
        })
        .setDescription("Confirm your decision")
        .setDescriptionLocalizations({
          hu: "Erősítsd meg döntésed.",
        })
        .setRequired(true)
        .addChoices(
          { name: "DENY", value: "NO" },
          { name: "CONFIRM", value: "YES" },
        ),
    ),
  async execute(interaction) {
    const { QuickDB } = require("quick.db");
    const db = new QuickDB();

    setup = await db.get(`${interaction.user.id}.setup`);

    if (setup === true) {
      const choice = interaction.options.get("confirm").value;
      if (choice === "YES") {
        const rights = await db.get(`${interaction.user.id}.working`);

        if (rights === true) {
          const balance = await db.get(`${interaction.user.id}.balance`);
          await db.set(`${interaction.user.id}.work_timeout`, 0);
          await db.set(`${interaction.user.id}.work_finish`, 0);
          await db.set(
            `${interaction.user.id}.work_finish_date`,
            "dateFormated",
          );
          await db.set(`${interaction.user.id}.work_reward`, 0);
          await db.set(`${interaction.user.id}.interaction_access`, true);
          await db.set(`${interaction.user.id}.working`, false);

          const prof =
            locales[`${interaction.locale}_claimjs_profile`] ?? "'s chief";
          const payoutBefore =
            locales[`${interaction.locale}_claimjs_payoutBefore`] ??
            "-- Good job my little worker. Now you deserv your paycheck.";
          const payoutOngoing =
            locales[`${interaction.locale}_claimjs_payoutOngoing`] ??
            "-- Thanks chief! Can I ask you how much do I get again?";
          const payoutAfter =
            locales[`${interaction.locale}_claimjs_payoutAfter`] ??
            "-- Yeah sure, you get:";

          await interaction.reply("Succesfully stoped work!");
        } else {
          await interaction.reply("You not working anything.");
        }
      } else {
        await interaction.reply("Don't worry, you still doing what you want.");
      }
    } else {
      await interaction.reply(
        "You haven't register yet. Use /create_character",
      );
    }

    // await db.set(`${interaction.user.id}`,{ work_timeout: time, work_finish: workFinishMs, work_finish_date: dateFormated, work_reward: reward, interaction_access: false, working: true })
  },
};
