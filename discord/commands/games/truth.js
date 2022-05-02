const tod = require('../../tod.json')
let t = tod.truth

module.exports = {
    name: 'truth',

    execute(Discord, client, message){
        
        let truth = t[Math.floor(Math.random() * t.length)];
        let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(truth)
        message.channel.send({embeds: [embed]})
    }
}