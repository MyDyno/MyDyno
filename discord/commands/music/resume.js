module.exports = {
    name: 'resume',

    alts: ['unpause'],

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

        if(queue.paused){
            queue.resume()
            const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(client.emotes.resume + ' | Resumed the song!')

            return message.channel.send({embeds: [embed]})
        }

        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(client.emotes.play + ' | Song is already playing!')

        message.channel.send({embeds: [embed]})
    }
}