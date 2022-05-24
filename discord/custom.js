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
            statusMessageId = '978310844607762442'
            PREFIX = client.config.mainPrefix
        }
        else if(token == client.config.betaToken){
            statusMessageId = '978310857270382602'
            PREFIX = client.config.betaPrefix
        }

        let statusChannel = client.channels.cache.get('839039008679788555')
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

                let embed = new Discord.MessageEmbed()
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle('Bot Status')
                    .setDescription('__Status:__ ' + client.statusTypeText + ' ' + client.statusMessage + '\nㅤ')
                    .addFields(
                        {
                            name: 'App Owner',
                            value: '<@' + client.config.botDeveloperId + '>'.toString(),
                            inline: true,
                        },
                        {
                            name: 'ㅤ',
                            value: 'ㅤ\nㅤ',
                            inline: true,
                        },
                        {
                            name: 'Bot Prefix',
                            value: '`' + PREFIX + '`',
                            inline: true,
                        },
                        {
                            name: 'Server Count',
                            value: client.guilds.cache.size.toString(),
                            inline: true,
                        },
                        {
                            name: 'ㅤ',
                            value: 'ㅤ\nㅤ',
                            inline: true,
                        },
                        {
                            name: 'User Count',
                            value: client.users.cache.size.toString(),
                            inline: true,
                        },
                        {
                            name: 'Client Events',
                            value: 'message: `' + clientCommand + '`\n' + 'interaction: `' + clientSlashCommand + '`',
                            inline: true,
                        },
                        {
                            name: 'ㅤ',
                            value: 'ㅤ\nㅤ\nㅤ',
                            inline: true,
                        },
                        {
                            name: 'Refresh Status',
                            value: 'Guild: `' + client.refreshGuildCountStatus.toString().toUpperCase() + '`\n' + 'User: `' + client.refreshUserCountStatus.toString().toUpperCase() + '`',
                            inline: true,
                        },
                        {
                            name: 'Uptime:',
                            value: '`' + uptime + '`',
                            inline: false,
                        }
                    )
    
                statusMessage.edit({embeds: [embed]})
            }
            //embed edit with third field using invisible name, value 'ㅤ'

            setStatus(statusMessage)
            setInterval(() => {
                setStatus(statusMessage)
            }, 30 * 1000)
        })
    })
}