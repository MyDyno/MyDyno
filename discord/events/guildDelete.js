module.exports = {
    name: 'guildDelete',

    execute(guild, Discord, client){
        
        const logsChannel = client.channels.cache.get(client.config.guildDeleteLogsChannelId)
        const logMessage = new Discord.MessageEmbed()
            .setColor('RED')
            .setThumbnail(guild.iconURL())
            .setTitle('Removed from `' + guild.name + '`')
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
            .setFooter("" + guild.name + "")
    
        logsChannel.send({embeds: [logMessage] })
    }
}