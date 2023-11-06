const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('encode')
        .setDescription('Encode message')
        .addStringOption(option => option.setName('type')
            .setDescription('encoding type')
            .setRequired(true)
            .addChoices(
                { name: '64 Bit', value: 'base64' },
                { name: '32 Bit', value: 'base32' },
                { name: '16 Bit', value: 'base16' },
                { name: '8 Bit', value: 'base8' },

            ))
        .addStringOption(option => option.setName('message')
            .setDescription('message to encode')
            .setRequired(true)),

    async execute(interaction) {
        const base32 = (await import('base32-encode')).default;

        const type = interaction.options.get("type").value
        const message = interaction.options.get("message").value



        let encodedMessage;
        switch (type) {
          case 'base64':
            encodedMessage = Buffer.from(message).toString('base64');
            break;
          case 'base32':
            encodedMessage = base32(Buffer.from(message), 'RFC4648');
            break;
          case 'base16':
            encodedMessage = Buffer.from(message).toString('hex');
            break;
          case 'base8':
            encodedMessage = parseInt(message, 10).toString(8);
            break;
          default:
            return interaction.reply('Invalid encoding type.');
        }
    
        await interaction.reply({content: encodedMessage, ephemeral: true});
    },
};