module.exports = {
    custom: async (Discord, client) => {
        main(Discord, client)
    }
}

const main = async (Discord, client) => {

    client.on('messageCreate', (message) => {

        let storeChannel = client.channels.cache.get('987257076713652235')
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