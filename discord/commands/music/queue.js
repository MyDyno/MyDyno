module.exports = {
    name: 'queue',

    alts: ['q'],

    async execute(Discord, client, message, args, PREFIX){
        
        let queue = client.distube.getQueue(message)

        if(!queue){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(`${client.emotes.error} | There is nothing in the queue right now!`)

            return message.channel.send({embeds: [embed]})
        }

        const q = queue.songs.map((song, i) => `${i === 0 ? '__**Playing:**__' : `${i}.`} \`${song.name}\` - \`${song.formattedDuration}\``).join('\n')
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${client.emotes.queue} | **Server Queue**\n\n${q}`)

        message.channel.send({embeds: [embed]})
    }
}