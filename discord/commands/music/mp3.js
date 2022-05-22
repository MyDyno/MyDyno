const { 
    getVoiceConnection,
    joinVoiceChannel,
    AudioPlayerStatus,
    createAudioResource,
    getNextResource,
    createAudioPlayer,
    NoSubscriberBehavior
} = require('@discordjs/voice')

module.exports = {
    name: 'mp3',

    execute(Discord, client, message, args, PREFIX){
        
        if(!message.member.voice.channel){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('You need to be in a voice channel!')

            return message.channel.send({embeds: [embed]})
        }

        if(!args[1]){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Nothing to play!')

            return message.channel.send({embeds: [embed]})
        }

        if(!args[1].endsWith('.mp3')){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription('Only `.mp3` file type supported!')

            return message.channel.send({embeds: [embed]})
        }

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })
        const player = createAudioPlayer()
        const subscription = connection.subscribe(player)

        player.play(createAudioResource(args[1]))
        message.channel.send('Playing!')

        player.on(AudioPlayerStatus.Idle, () => {
            player.stop()
            connection.destroy()
            message.channel.send('Played!')
        })

        player.on('error', (error) => {
            message.channel.send('Error: ' + error.message + ' with resource ' + error.resource.metadata.title + '!')
            player.play(getNextResource())
        })
    }
}