module.exports = {
    name: 'advertise',
    alts: ['adv'],

    async execute(Discord, client, message, args, PREFIX){
        
        if(client.config.botDeveloperId.includes(message.author.id)){

            let advertisement1 = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(
                    'Hi there, I am a fun, game and music bot used in over `' + client.guilds.cache.size + ' servers` Try out my `music` or `game` commands `' + PREFIX + 'play` or `' + PREFIX + 'rps`! Please support us if u like it!' +
                    '\n\n' +
                    'This message was sent to you by me `' + client.users.cache.find(u => u.id == client.config.botDeveloperId[0]).tag + '` **VERY SORRY IF IT LOOKS LIKE SPAM** and also to everyone from the mutual servers because we need your support to grow across servers!' + 
                    '\n\n' +
                    '[Click here](' + client.config.botInvite + ') to invite me to your server! Add me to your server, try out some `music` commands, if you like it, please also recommend this bot to your friends :)'
                    
                )
            
            let advertisement2 = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription('Invite me: ' + client.config.botInvite)
                .setTimestamp()
                .setFooter({text: client.user.username})

            let advChannel = client.channels.cache.find(ch => ch.id == '987256262884474900')

            if(!args[1]){
                
                return message.channel.send('-list, -send, -sendall')
            }

            if(args[1] == '-list'){
                
                message.guild.members.cache.forEach(async (guildMember) => {
    
                    advChannel.send('From: `' + message.guild.name + '` Member: `' + guildMember.user.tag + '`')
                })
            }

            else if(args[1] == '-send'){

                message.guild.members.cache.forEach(async (guildMember) => {
    
                    await guildMember.send({embeds: [advertisement1, advertisement2]})
                    .then(() => {
                        advChannel.send('From: `' + message.guild.name + '` Sent to: `' + guildMember.user.tag + '`')
                    })
                    .catch((err) => {
                        advChannel.send('From: `' + message.guild.name + '` Can\'t send to: `' + guildMember.user.tag + '`')
                    })
                })
            }

            else if(args[1] == '-sendall'){

                client.users.cache.forEach(async (guildMember) => {
    
                    await guildMember.send({embeds: [advertisement1, advertisement2]})
                    .then(() => {
                        advChannel.send('From: `' + message.guild.name + '` Sent to: `' + guildMember.user.tag + '`')
                    })
                    .catch((err) => {
                        advChannel.send('From: `' + message.guild.name + '` Can\'t send to: `' + guildMember.user.tag + '`')
                    })
                })
            }
            
        }
        else{

            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | This command is limited to the application owner only!')

            return message.channel.send({embeds: [embed]})
        }
        
    }
}