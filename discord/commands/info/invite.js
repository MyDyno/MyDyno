module.exports = {
    name: 'invite',

    execute(Discord, client, message){
        
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('[Invite me](' + client.config.botInvite + ')')

        message.channel.send({ embeds: [embed] })
        
    }
}