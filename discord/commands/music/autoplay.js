module.exports = {
    name: 'autoplay',

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

        const autoplay = queue.toggleAutoplay()
        const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)

        message.channel.send({embeds: [embed]})
    }
}