const tod = require('../../tod.json')
let d = tod.dare

module.exports = {
    name: 'dare',

    execute(Discord, client, message){
        
        let dare = d[Math.floor(Math.random() * d.length)];
        let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(dare)
        message.channel.send({embeds: [embed]})
    }
}