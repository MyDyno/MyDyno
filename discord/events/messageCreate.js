const config = require('../config.json')
let PREFIX;
let token = process.env.token || config.betaToken
const settingModel = require('../../models/discord/setting')
const fs = require('fs');

module.exports = {
    name: 'messageCreate',

    async execute(message, Discord, client){

        if(message.author.bot) return;

        if(message.channel.type == 'DM'){            
            let dmLogsChannel = client.channels.cache.find(channel => channel.id == config.dmLogsChannelId)
            const dm = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('`' + message.content + '`')
    
            dmLogsChannel.send({embeds: [dm] })

            return message.channel.send('Please use commands inside a server!')
        }

        let model = await settingModel.findOne({guildId: message.guild.id})

        if(token == process.env.token){
            PREFIX = config.mainPrefix
            if(model){
                if(model.prefix){
                    PREFIX = model.prefix
                }
            }
        }
        else if(token == config.betaToken){
            PREFIX = config.betaPrefix   
        }

        let args = message.content.substring(PREFIX.length).split(' ')
        if(!message.content.startsWith(PREFIX)) return;

        let commandFolders = fs.readdirSync('./discord/commands/')
        for(const folder of commandFolders){

            let commandFiles = fs.readdirSync('./discord/commands/' + folder).filter(file => file.endsWith('.js'))
            for(const file of commandFiles){

                const command = require('../commands/' + folder + '/' + file)
    
                if(!command.alts){
                    command.alts = []
                } 
                if(args[0] == command.name){
                    client.commands.get(command.name).execute(Discord, client, message, args, PREFIX)
                }
    
                command.alts.forEach((alt) => {
                    if(args[0] == alt){
                        client.commands.get(alt).execute(Discord, client, message, args, PREFIX)
                    }
                })
            }
        }

    }
}