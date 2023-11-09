const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const locales = require('../configs/locales.json')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stock')
		.setNameLocalizations({
			hu: 'reszveny',
		})
		.setDescription('Provides informations about a stock on eotvos.projekt9.hu.')
		.setDescriptionLocalizations({
			hu: 'Információkat nyújt a részvényekről az eotvos.projekt9.hu oldalon.'
		})
		.addStringOption(option =>
			option.setName('stock')
				.setNameLocalizations({
					hu: 'reszveny'
				})
				.setDescription('Select stock.')
				.setDescriptionLocalizations({
					hu: 'Válassz ki egy részvényt.'
				})
				.setRequired(true)
				.addChoices(
					{ name: 'Gépészet', value: 'gepeszet' },
					{ name: 'Idegennyelv', value: 'idegennyelv' },
					{ name: 'Informatika', value: 'info' },
					{ name: 'Magyar', value: 'magyar' },
					{ name: 'Matematika', value: 'matek' },
					{ name: 'Természetismeret', value: 'termeszet' },
					{ name: 'Testnevelés', value: 'tesi' },
					{ name: 'Történeleme', value: 'tori' },
					
					
				)),
	async execute(interaction) {
		const https = require('https');

		const options = {
			hostname: 'eotvos.projekt9.hu',
			path: '/comm.php',
			method: 'POST',
			headers: {
				'authority': 'eotvos.projekt9.hu',
				'accept': '*/*',
				'accept-language': 'hu-HU,hu;q=0.9,en-US;q=0.8,en;q=0.7',
				'cache-control': 'no-cache',
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'cookie': 'token=HPp%40lzat1PIf7n15Ct-MYPna%401Xm9bq%40f; username=patkosdominik; osztaly=2021I; id=223',
				'origin': 'https://eotvos.projekt9.hu',
				'pragma': 'no-cache',
				'referer': 'https://eotvos.projekt9.hu/',
				'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Windows"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
				'x-requested-with': 'XMLHttpRequest'
			}
		};
		const req = https.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', async () => {
				const listN = []
				const listP = []
				const d = JSON.parse(data);
				for (const x of d) {
					const name = x.rname;
					const price = x.arfolyam;
					if (name === interaction.options.get('stock').value) {
					listN.push(name)
					listP.push(price)
					}
				}
				const prof = locales[`${interaction.locale}_stockjs_profile`] ?? "Eötvös stock"
				const stockEmbed = new EmbedBuilder()
				  .setColor(0xFFFFFF)
				  .setTitle(prof)
				  .setThumbnail('https://www.eotvosszki.hu/_next/image?url=https%3A%2F%2Fbg-eotvos.cms.intezmeny.edir.hu%2Fuploads%2Fthumbnail_elg_logo_8fc4582687.PNG&w=128&q=90');
				
				for (let i = 0; i < listN.length; i++) {
					const sellP = listP[i]*0.9
				  stockEmbed.addFields(
					{ name: `${listN[i]} részvény: `, value: `${listP[i]} - ${sellP.toFixed(2)}` },
					{ name: `10db ${listN[i]} részvény: `, value: `${listP[i]*10} - ${sellP.toFixed(2)*10}` }
					
				  );
				}
				
				stockEmbed.setTimestamp()
				  .setFooter({ text: ' ' });
				await interaction.reply({ embeds: [stockEmbed] });
			  });
		});

		req.on('error', (error) => {
			console.error(error);
		});

		req.write('type=stock');
		await req.end();

	},
};