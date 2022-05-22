module.exports = {
    name: 'join',

    alts: ['connect'],

    async execute(Discord, client, message, args, PREFIX){
        
        let voiceChannel = message.member.voice.channel

        if(!voiceChannel){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | You need to be in a voice channel!')

            return message.channel.send({embeds: [embed]})
        }

        client.distube.voices.join(voiceChannel)
        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(client.emotes.success + ' | Joined voice channel!')

        return message.channel.send({embeds: [embed]})
    }
}