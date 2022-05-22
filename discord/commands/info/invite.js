module.exports = {
    name: 'invite',

    execute(Discord, client, message){

        let token = process.env.token || client.config.betaToken
        let botInvite;
        if(token == process.env.token){botInvite = client.config.botInvite}
        else if(token == client.config.betaToken){botInvite = client.config.betaBotInvite}
        
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('[Invite me](' + botInvite + ')')

        message.channel.send({ embeds: [embed] })
        
    }
}