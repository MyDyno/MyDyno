const config = require('../../config.json')

module.exports = {
    name: 'advertise',

    async execute(Discord, client, message, args, PREFIX){
        
        if(message.author.id == config.botDeveloperId){

            let advertisement1 = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(
                    'Hi there, I am a fun and game bot used in over `' + client.guilds.cache.size + ' servers` Try out my game commands `' + PREFIX + 'rps` or `' + PREIFX + 'quiz`! Please support us if u like it!' +
                    '\n\n' +
                    'This message was sent to you by me `Raunak Raj#0060` **VERY SORRY IF IT LOOKS LIKE SPAM** and also to everyone from the mutual servers because we need your support to grow across servers!' + 
                    '\n\n' +
                    '[Click here](' + config.botInvite + ') to invite me to your server! Add me to your server, try out some commands, if you like it, please also recommend this bot to your friends :)'
                    
                )
            
            let advertisement2 = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription('Invite me: ' + config.botInvite)
                .setTimestamp()
                .setFooter(client.user.username)

            let advChannel = client.channels.cache.find(ch => ch.id == '879246112526049320')

            if(!args[1]){
                
                return message.channel.send('-list, -send')
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
            
        }
        
    }
}