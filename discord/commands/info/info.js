module.exports = {
    name: 'info',

    execute(Discord, client, message){
        
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: client.user.username + ' Info',
                    value: 'My name is `' + client.user.username + '` and I was developed by `' + client.users.cache.find(u => u.id == client.config.botDeveloperId[0]).tag +
                    '`! I am a fun, music economy, moderation and game bot! If you like me you can [invite me](' + client.config.botInvite + '). Currently I am being used in `' + client.guilds.cache.size +
                    '` servers! You can also [vote me](' + client.config.voteBot + ') and if you  are having any trouble you can also join the [support server](' + client.config.supportServer + ')',
                },
                {
                    name: 'Uptime',
                    value: '`' + uptime + '`',
                }
            )
            .setTimestamp()
            .setFooter({text: client.user.username});

        message.channel.send({ embeds: [embed] })
        
    }
}