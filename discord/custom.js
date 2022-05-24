module.exports = {
    custom: async (Discord, client) => {
        main(Discord, client)
    }
}

const main = async (Discord, client) => {
    
    client.on('ready', () => {

        let token = process.env.token || client.config.betaToken
        let PREFIX;
        let statusMessageId;
        let clientCommand;
        let clientSlashCommand;
        if(token == process.env.token){
            statusMessageId = client.config.mainStatusMessageId
            PREFIX = client.config.mainPrefix
        }
        else if(token == client.config.betaToken){
            statusMessageId = client.config.betaStatusMessageId
            PREFIX = client.config.betaPrefix
        }

        let statusChannel = client.channels.cache.get(client.config.statusChannelId)
        statusChannel.messages.fetch(statusMessageId).then((statusMessage) => {

            const setStatus = (statusMessage) => {

                if(client.commandsHandler == true){
                    clientCommand = 'enabled'
                }
                else if(client.commandsHandler == false){
                    clientCommand = 'disabled'
                }
                if(client.slashCommandsHandler == true){
                    clientSlashCommand = 'enabled'
                }
                else if(client.slashCommandsHandler == false){
                    clientSlashCommand = 'disabled'
                }

                let totalSeconds = (client.uptime / 1000);
                let days = Math.floor(totalSeconds / 86400);
                totalSeconds %= 86400;
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let seconds = Math.floor(totalSeconds % 60);
                let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;   

                let statusTypeText;
                if(client.user.presence.activities[0].type == 'COMPETING'){statusTypeText = 'Competing in'}
                else if(client.user.presence.activities[0].type == 'LISTENING'){statusTypeText = 'Listening to'}
                else if(client.user.presence.activities[0].type == 'PLAYING'){statusTypeText = 'Playing'}
                else if(client.user.presence.activities[0].type == 'WATCHING'){statusTypeText = 'Watching'}

                let embed = new Discord.MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle('Bot Status')
                    .setDescription('__Status:__ ' + statusTypeText + ' ' + client.user.presence.activities[0].name + '\nㅤ')
                    .addFields(
                        {name: 'App Owner', value: '<@' + client.config.botDeveloperId + '>'.toString(), inline: true},
                        {name: 'ㅤ', value: 'ㅤ\nㅤ', inline: true},
                        {name: 'Bot Prefix', value: '`' + PREFIX + '`', inline: true},
                        {name: 'Server Count', value: client.guilds.cache.size.toString(), inline: true},
                        {name: 'ㅤ', value: 'ㅤ\nㅤ', inline: true},
                        {name: 'User Count', value: client.users.cache.size.toString(), inline: true},
                        {name: 'Client Events', value: 'message: `' + clientCommand + '`\n' + 'interaction: `' + clientSlashCommand + '`', inline: true},
                        {name: 'ㅤ', value: 'ㅤ\nㅤ\nㅤ', inline: true},
                        {name: 'Refresh Status', value: 'Guild: `' + client.refreshGuildCountStatus.toString().toUpperCase() + '`\n' + 'User: `' + client.refreshUserCountStatus.toString().toUpperCase() + '`', inline: true},
                        {name: 'Uptime:', value: '`' + uptime + '`', inline: false}
                    )
    
                statusMessage.edit({embeds: [embed]})
            }

            setStatus(statusMessage)
            setInterval(() => {
                setStatus(statusMessage)
            }, 30 * 1000)
        })
    })
}