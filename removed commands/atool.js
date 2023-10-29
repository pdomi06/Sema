const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const locales = require('../configs/locales.json')
const { QuickDB } = require("quick.db");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('atool')
        .setDescription('Manage everything.')
        .addStringOption(option => option.setName('db_id')
            .setDescription('asd')
            .setRequired(true))
        .addStringOption(option => option.setName('db_func_type')
            .setDescription('asd')
            .setRequired(true)
            .addChoices(
                { name: 'GET', value: 'get' },
                { name: 'SET', value: 'set' },
                { name: 'ADD', value: 'add' },
                { name: 'PUSH', value: 'push' },

            ))
        .addStringOption(option => option.setName('pocket')
            .setDescription('asd')
            .setRequired(true))
        .addStringOption(option => option.setName('value_type')
            .setDescription('asd')
            .addChoices(
                { name: 'STRING', value: 'str' },
                { name: 'INTEGER', value: 'int' },
                { name: 'BOOLING', value: 'booling' },
            )
            .setRequired(true))
        .addStringOption(option => option.setName('value')
            .setDescription('asd')
            .setRequired(true))
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const db = new QuickDB();

        const id = interaction.options.get("db_id").value
        const type = interaction.options.get("db_func_type").value
        const pocket = interaction.options.get("pocket").value
        const value_type = interaction.options.get("value_type").value




        if (type == "get") {
            let result = await db.get(`${id}.${pocket}`)
            await interaction.reply(`${result}`)
        } else if (type == "set") {
            var value = interaction.options.get("value").value
            if (value_type == "int") {
                var value = parseInt(value)
    
            } else if (value_type == "booling") {
                if (value.toLowerCase() == "true") {
                    var value = true
                } else if (value.toLowerCase() == "false") {
                    var value = false
                } else {
                    await interaction.reply(`Booling value only can be \`true\` or \`false\``)
                }
    
            } else {
                await interaction.reply("Something wrong with the value type at set")
            }
            let call_header = `${id}.${pocket}`
            await db.set(call_header, value)
            await interaction.reply("Successfully done")
        }

    },
};