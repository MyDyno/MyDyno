const settingModel = require('../../models/discord/setting')
const fs = require('fs');

module.exports = {
    name: 'messageCreate',

    async execute(message, Discord, client){

        if(message.author.bot) return;

        let token = process.env.token || client.config.betaToken
        let PREFIX;
        let model = await settingModel.findOne({guildId: message.guild.id})

        if(token == process.env.token){
            PREFIX = client.config.mainPrefix
            if(model){
                if(model.prefix){
                    PREFIX = model.prefix
                }
            }
        }
        else if(token == client.config.betaToken){
            PREFIX = client.config.betaPrefix   
        }

        if(message.content == '<@' + client.user.id + '>' || message.content == '<@!' + client.user.id + '>'){
            const embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription('My prefix here is `' + PREFIX + '`')
            message.channel.send({embeds: [embed]})
        }
        
        if(message.channel.type == 'DM'){            
            let dmLogsChannel = client.channels.cache.find(channel => channel.id == client.config.dmLogsChannelId)
            const dm = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription('`' + message.content + '`')
            
            dmLogsChannel.send({embeds: [dm] })
            
            return message.channel.send('Please use commands inside a server!')
        }
        
        let args = message.content.substring(PREFIX.length).split(' ')
        if(!message.content.startsWith(PREFIX)) return;
        
        let commandFolders = fs.readdirSync('./discord/commands/')
        for(const folder of commandFolders){

            let commandFiles = fs.readdirSync('./discord/commands/' + folder).filter(file => file.endsWith('.js'))
            for(const file of commandFiles){

                const command = require('../commands/' + folder + '/' + file)

                if(args[0].toLowerCase() == command.name){
                    client.commands.get(command.name).execute(Discord, client, message, args, PREFIX)
                }
                if(command.alts){
                    command.alts.forEach((alt) => {
                        if(args[0].toLowerCase() == alt){
                            client.alts.get(alt).execute(Discord, client, message, args, PREFIX)
                        }
                    })
                }
            }
        }

    }
}