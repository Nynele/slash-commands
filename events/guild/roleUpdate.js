const { Embed } = require('discord.js');

module.exports = async(client, oldRole, newRole) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    const allLogs = await newRole.guild.fetchAuditLogs({ type: "ROLE_UPDATE" });
    const fetchModerator = await allLogs.entries.first();
    if (oldRole.color !== newRole.color) {
        const embed = new Embed()
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .addFields(
            {
                name: "Old Color:",
                value: oldRole.hexColor
            },
            {
                name: "New Color:",
                value: newRole.hexColor
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
    if (oldRole.name !== newRole.name) {
        const embed = new Embed()
        .setAuthor({ name: newRole.guild.name, iconURL: newRole.guild.iconURL({ dynamic: true }) })
        .setDescription(`😛 **\`${newRole.name}\` has been updated.**`)
        .setFooter({ text: fetchModerator.executor.tag, iconURL: fetchModerator.executor.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .addFields(
            {
                name: "Old name:",
                value: oldRole.name
            },
            {
                name: "New name:",
                value: newRole.name
            },
            {
                name: "Responsible Moderator:",
                value: `<@${fetchModerator.executor.id}>`
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
}