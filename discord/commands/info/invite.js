const config = require('../../config.json')

module.exports = {
    name: 'invite',

    execute(Discord, client, message){
        
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('[Invite me](' + config.botInvite + ')')

        message.channel.send({ embeds: [embed] })
        
    }
}