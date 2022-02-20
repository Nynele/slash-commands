const { Embed } = require('discord.js');

module.exports = async(client, oldMessgae, newMessage) => {
    const logChannel = await client.channels.cache.get(process.env.LOG_CHANNEL);
    if (!logChannel) return;
    if (oldMessgae.content !== newMessage.content) {
        const embed = new Embed()
        .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setFooter({ text: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) })
        .setDescription(`📝 **Message sent by ${newMessage.author} edited in ${newMessage.channel}.** [Jump To Message](${newMessage.url}})`)
        .addFields(
            {
                name: "Old:",
                value: `\`\`\`\n${oldMessgae.content}\`\`\``
            },
            {
                name: "New:",
                value: `\`\`\`\n${newMessage.content}\`\`\``
            }
        )
        return logChannel.send({ embeds: [embed] })
    }
}