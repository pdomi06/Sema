const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		const ch = interaction.client.channels.cache.get('1248656452277637120');
		if (!ch) return;
		
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (interaction.user.id === '715130502335561749') { // no one
				return interaction.reply({ content: 'You are banned from using this bot', ephemeral: true });
			}
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}

			ch.send({ content: `**${interaction.user.tag}** executed \`${interaction.commandName}\` in **${interaction.guild.name}** (interaction)` });
		}

	if (interaction.isButton()) {
			const button = interaction.customId
			const command = interaction.client.commands.get(button);

			if (!command) {
				console.error(`No command matching ${button} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${button}`);
				console.error(error);
			}
			
			ch.send({ content: `**${interaction.user.tag}** executed \`${button}\` in **${interaction.guild.name}** (button)` });
		}


	},
};