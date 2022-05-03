module.exports = {
    name: 'shuffle',

    async execute(Discord, client, message, args, PREFIX){
        
        let queue = client.distube.getQueue(message)
        let voiceChannel = message.member.voice.channel

        if(!voiceChannel){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | You need to be in a voice channel!')

            return message.channel.send({embeds: [embed]})
        }

        if(!queue){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`${client.emotes.error} | There is nothing in the queue right now!`)

            return message.channel.send({embeds: [embed]})
        }

        try{
            queue.shuffle()
            const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${client.emotes.success} | Shuffled songs in the queue!`)

            message.channel.send({embeds: [embed]})
        }
        catch(err){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`${client.emotes.error} | Not much songs to shuffle!`)

            message.channel.send({embeds: [embed]})
        }
    }
}