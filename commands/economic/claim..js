const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const locales = require("../../configs/locales.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("claim")
    .setNameLocalizations({
      hu: "begyujt",
    })
    .setDescription("Collect your hard earned goods.")
    .setDescriptionLocalizations({
      hu: "Gyűjtsd be a tisztességesen neked járó alapanyagokat.",
    }),
  async execute(interaction) {
    const { QuickDB } = require("quick.db");
    const db = new QuickDB();

    setup = await db.get(`${interaction.user.id}.setup`);

    if (setup === true) {
      const rights = await db.get(`${interaction.user.id}.working`);

      if (rights === true) {
        const ready = await db.get(`${interaction.user.id}.work_finish`);
        if (ready <= Date.now()) {
          const reward = await db.get(`${interaction.user.id}.work_reward`);
          await db.add(`${interaction.user.id}.balance`, reward);
          //balance = await db.get(`${interaction.user.id}.balance`)
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
            "Chief: -- Good job my little worker. Now you deserv your paycheck.";
          const payoutOngoing =
            locales[`${interaction.locale}_claimjs_payoutOngoing`] ??
            "Me: -- Thanks chief! Can I ask you how much do I get again?";
          const payoutAfter =
            locales[`${interaction.locale}_claimjs_payoutAfter`] ??
            "Chiefe: -- Yeah sure, you get:";

          const claimEmbed = new EmbedBuilder()
            .setColor(0x4d2d82)
            .setTitle(`${interaction.user.username}${prof}`)
            .setFields(
              { name: payoutBefore, value: " " },
              { name: payoutOngoing, value: " " },
              { name: payoutAfter, value: `${reward} coin` },
            )
            .setTimestamp()
            .setFooter({ text: " " });
          await interaction.reply({ embeds: [claimEmbed] });
        } else {
          const readyFormated = await db.get(
            `${interaction.user.id}.work_finish_date`,
          );
          await interaction.reply(
            `You can collect your goods at \`${readyFormated}\``,
          );
        }
      } else {
        await interaction.reply("You not working.");
      }
    } else {
      await interaction.reply(
        "You haven't register yet. Use /create_character",
      );
    }

    // await db.set(`${interaction.user.id}`,{ work_timeout: time, work_finish: workFinishMs, work_finish_date: dateFormated, work_reward: reward, interaction_access: false, working: true })
  },
};
