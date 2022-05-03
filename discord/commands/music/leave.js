module.exports = {
    name: 'dc',

    alts: ['leave', 'disconnect', 'stop'],

    async execute(Discord, client, message, args, PREFIX){
        
        let voiceChannel = message.member.voice.channel
        let queue = client.distube.getQueue(message)

        if(!voiceChannel){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | You need to be in a voice channel!')

            return message.channel.send({embeds: [embed]})
        }

        if(queue){
            queue.stop()
        }
        client.distube.voices.leave(message)
        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(client.emotes.stop + ' | Stopped if playing and left voice channel if joined!')

        return message.channel.send({embeds: [embed]})
    }
}