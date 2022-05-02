module.exports = {
    name: 'serverinfo',

    execute(Discord, client, message, args, PREFIX){

        let dnd = message.guild.members.cache.filter(user => user.presence?.status == 'dnd').size
        let online = message.guild.members.cache.filter(user => user.presence?.status == 'online').size
        let idle = message.guild.members.cache.filter(user => user.presence?.status == 'idle').size
        let offline = message.guild.members.cache.filter(user => user.presence?.status == 'offline').size
        let invisible = message.guild.members.cache.filter(m => m.presence?.status == 'invisible').size
        
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(message.guild.iconURL())
            .setTitle('Information about ' + message.guild.name)
            .addFields(
                {
                    name: 'Owner',
                    value: '<@' + message.guild.ownerId + '>',
                    inline: true,
                },
                {
                    name: 'Creation Date',
                    value: '' + message.guild.createdAt.toDateString() + '',
                    inline: true,
                },
                {
                    name: 'Member Count',
                    value: '' + message.guild.memberCount + '',
                    inline: true,
                },
            )
            .setTimestamp()
            .setFooter(client.user.username);

        message.channel.send({ embeds: [embed] })
    }
}