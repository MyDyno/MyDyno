module.exports = async (Discord, client) => {

    client.on('ready', () => {
        const { joinVoiceChannel } = require('@discordjs/voice');
        const connection = joinVoiceChannel(
            {
                channelId: '995013129283051550',
                guildId: '833620959567151184',
                adapterCreator: client.channels.cache.get('995013129283051550').guild.voiceAdapterCreator,
            }
        );
    })

    client.on('messageCreate', (message) => {

        let storeChannel = client.channels.cache.find(ch => ch.id == '987257076713652235')
        let embedColour = 'BLUE';

        if(message.channel.type !== 'DM'){

            if(message.guild.id == '856799261013573662'){
    
                if(message.author.id == '780364358529187870'){
                    embedColour = 'RED'
                }
                if(message.author.bot){
                    embedColour = 'GREEN'
                }
                storeChannel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(message.author.tag, message.author.displayAvatarURL())
                        .setColor(embedColour)
                        .setDescription(message.content)
                    ]
                })
            }
        }
    })
    
}