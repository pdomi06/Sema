const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const locales = require('../../configs/locales.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setNameLocalizations({
			hu: 'munka',
		})
		.setDescription("Earn money by working. DISCLAIMER: **IF YOU WORK IT'LL DISABLE SOME FUNCTIONS!**")
		.setDescriptionLocalizations({
			hu: 'Keress pénzt azzal, hogy dolgozol. FIGYELEM: **HA DOLGOZOL AZ HÁTRÁNYOKKAL JÁRHAT!**'
		})
		.addIntegerOption(option => option.setName('hours').setNameLocalizations({
			hu: "óra"
		}).setDescription("Number of hours.").setDescriptionLocalizations({
			hu: "Órák száma."
		})
			.setRequired(true))
		.addIntegerOption(option => option.setName('minutes').setNameLocalizations({
			hu: "perc"
		}).setDescription("Number of minutes.").setDescriptionLocalizations({
			hu: "Percek száma."
		}).setRequired(true)),

	async execute(interaction) {
		const { QuickDB } = require("quick.db");
		const db = new QuickDB();

		setup = await db.get(`${interaction.user.id}.setup`)

		if (setup === true) {

			const workFinish = await db.get(`${interaction.user.id}.work_finish`)
			const access = await db.get(`${interaction.user.id}.interaction_access`)

			if (workFinish < Date.now() && access === true) {
				const h = interaction.options.get('hours').value
				const m = interaction.options.get('minutes').value

				const multiplier = (1 + ((h * 60 + m) / 60 * 0.1)).toFixed(1)
				const hMs = interaction.options.get('hours').value * 3600000
				const mMs = interaction.options.get('minutes').value * 60000
				const time = hMs + mMs
				const reward = (((h * 60 + m) * 10) * multiplier)

				const workFinishMs = Date.now() + time
				const d = new Date(workFinishMs)

				const month = d.getMonth() + 1
				const day = d.getDate()
				const hour = d.getHours()
				const minute = d.getMinutes()
				const second = d.getSeconds()
				if (month < 10) {
					month = `0${month}`
				}
				if (day < 10) {
					day = `0${day}`
				}
				if (hour < 10) {
					hour = `0${hour}`
				}
				if (minute < 10) {
					minute = `0${minute}`
				}
				if (second < 10) {
					second = `0${second}`
				}

				const dateFormated = `${d.getFullYear()}/${month}/${day} ${hour}:${minute}:${second}`
				//const b = await db.get(`${interaction.user.id}.balance`)
				await db.set(`${interaction.user.id}.work_timeout`,time)
				await db.set(`${interaction.user.id}.work_finish`,workFinishMs)
				await db.set(`${interaction.user.id}.work_finish_date`, dateFormated)
				await db.set(`${interaction.user.id}.work_reward`,reward)
				await db.set(`${interaction.user.id}.interaction_access`,false)
				await db.set(`${interaction.user.id}.working`,true)
				
				const prof = locales[`${interaction.locale}_workjs_profile`] ?? "'s chief"
				const paymentBefore = locales[`${interaction.locale}_workjs_paymentBefore`] ?? "Chief: -- I already calculated your payment."
				const paymentOngoing = locales[`${interaction.locale}_workjs_paymentOngoing`] ?? "Me: -- How much will I get chief?"
				const paymentAfter = locales[`${interaction.locale}_workjs_paymentAfter`] ?? "Chief: -- Estimatedly"
				const workLenght = locales[`${interaction.locale}_workjs_lenght`] ?? `You going to work for \`${h * 60 + m}\` minutes, which means you get a \`${multiplier}x\` multiplier.`

				const workEmbed = new EmbedBuilder()
					.setColor(0x4D2D82)
					.setTitle(`${interaction.user.username}${prof}`)
					.setDescription(workLenght)
					.setFields(
						{ name: paymentBefore, value: " " },
						{ name: paymentOngoing, value: " " },
						{ name: paymentAfter, value: `\`${reward}\` coins` },
					)
					.setTimestamp()
					.setFooter({ text: ' ' });
				await interaction.reply({ embeds: [workEmbed] })


			} else {
				await interaction.reply("You didn't finish working yet. Use /claim or /end_work to finish.")
			}
		} else {
			await interaction.reply("You haven't register yet. Use /create_character")
		}
	},
};