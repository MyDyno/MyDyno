module.exports = {
    name: 'loop',

    alts: ['repeat', 'rp'],

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

        let mode;
        let repeatMode;

        if(!args[1]){
            const embed = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setDescription(`${client.emotes.error} | Please provide loop type: \`${PREFIX}loop off\`, \`${PREFIX}loop song\`, \`${PREFIX}loop queue\``)

            return message.channel.send({embeds: [embed]})
        }

        if(args[1] == 'off'.toLowerCase()){
            mode = 0
        }
        else if(args[1] == 'song'.toLowerCase()){
            mode = 1
        }
        else if(args[1] == 'queue'.toLowerCase()){
            mode = 2
        }
        else{
            const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${client.emotes.error} | Please provide correct loop type: \`${PREFIX}loop off\`, \`${PREFIX}loop song\`, \`${PREFIX}loop queue\``)

            return message.channel.send({embeds: [embed]}) 
        }

        repeatMode = queue.setRepeatMode(mode)
        repeatMode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${client.emotes.repeat} | Set repeat mode to \`${repeatMode}\``)

        message.channel.send({embeds: [embed]})
    }
}