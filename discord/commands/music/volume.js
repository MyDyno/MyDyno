module.exports = {
    name: 'volume',

    alts: ['vol', 'vl'],

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
                .setDescription(`${client.emotes.error} | Please provide volume level!`)

            return message.channel.send({embeds: [embed]})
        }

        if(isNaN(args[1]) || args[1] < 0 || args[1] > 100){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`${client.emotes.error} | Please enter a valid volume (between 0 to 100)!`)

            return message.channel.send({embeds: [embed]})
        }

        let volume = Number(args[1])
        queue.setVolume(volume)
        const embed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setDescription(`${client.emotes.success} | Volume set to \`${volume}%\``)

        message.channel.send({embeds: [embed]})
    }
}