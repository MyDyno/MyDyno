module.exports = {
    name: 'seek',

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

        if(!args[1]){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`${client.emotes.error} | Please provide position (in seconds) to seek!`)

            return message.channel.send({embeds: [embed]})
        }

        if(isNaN(args[1]) || args[1] < 0 || args[1] > queue.songs[0].duration){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`${client.emotes.error} | Please enter a valid time (in seconds)!`)

            return message.channel.send({embeds: [embed]})
        }
        let time = Number(args[1])
        queue.seek(time)
        const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`Seeked to ${time} seconds!`)

        message.channel.send({embeds: [embed]})
    }
}