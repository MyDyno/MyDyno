module.exports = {
    name: 'guildCreate',

    execute(guild, Discord, client){
        
        const logsChannel = client.channels.cache.find(ch=> ch.id == client.config.guildCreateLogsChannelId)
        const logMessage = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setThumbnail(guild.iconURL())
            .setTitle('Added to `' + guild.name + '`')
            .addFields(
                {
                    name: '**__Name__**',
                    value: "" + guild.name + "",
                    inline: true,
                },
                {
                    name: '**__Users__**',
                    value: "" + guild.memberCount + "",
                    inline: true,
                },
            )
            .setTimestamp()
            .setFooter({text: "" + guild.name + ""})
        
        logsChannel.send({embeds: [logMessage] })
    }
}