const { Events, EmbedBuilder } = require('discord.js');
require('dotenv').config()

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldUser, newUser) {
        const { QuickDB } = require("quick.db");
        const db = new QuickDB();

        const user = newUser ?? oldUser;

        const id = await db.get(`${user.guild.id}.log_id`);
        if (!id) return;
        
        const ch = user.client.channels.cache.get(id);
        if (!ch) return;

        try {
            const fetchedUser = await user.client.users.fetch(user.id);
            const username = fetchedUser.username;

            if (!oldUser.channelId && newUser) {
                const VoiceStateUpdateEmbedJ = new EmbedBuilder()
                    .setColor(process.env.GREEN)
                    .setTitle(`\`${username}\` joined <#${user.channelId}>`)
                    .setTimestamp()
                    .setFooter({ text: ' ' });
                ch.send({ embeds: [VoiceStateUpdateEmbedJ] });
            } 
            if (user.channelId == null){
                const VoiceStateUpdateEmbedL = new EmbedBuilder()
                    .setColor(process.env.RED)
                    .setTitle(`\`${username}\` left <#${oldUser.channelId}>`)
                    .setTimestamp()
                    .setFooter({ text: ' ' });
                ch.send({ embeds: [VoiceStateUpdateEmbedL] });
            }
            
        } catch (error) {
            console.error(error);
        }


    },
};
