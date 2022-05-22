module.exports = {
    name: 'kick',

    execute(Discord, client, message, args, PREFIX){

        const kickMember = message.mentions.members.first()
        
        if(!message.member.permissions.has('KICK_MEMBERS')){

            const noPermsEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have permission `KICK_MEMBERS` to kick!')

            return message.channel.send({ embeds: [noPermsEmbed] })
        }
        if(!message.guild.me.permissions.has('KICK_MEMBERS')){

            const noPermsEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('I dont have permission `KICK_MEMBERS` to kick!')

            return message.channel.send({ embeds: [noPermsEmbed] })
        }

        if(!args[1] || !kickMember){

            const noKickMember = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Please mention someone to kick!\nUsage: `' + PREFIX + 'kick [@user] [reason]`')

            return message.channel.send({embeds: [noKickMember] })
        }

        if(kickMember.permissions.has('KICK_MEMBERS')){

            const cantKickEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Couldn\'t kick because `' + kickMember.user.tag + '` is a moderator!')
            return message.channel.send({embeds: [cantKickEmbed] })
        }

        if(!args.slice(2).join(' ')){
            kickMember.kick({reason: null})
            .then(() => {
                    
                const kickedEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('Successfully kicked `' + kickMember.user.tag + '`')

                return message.channel.send({embeds: [kickedEmbed]})
            })
        }
        else{
            kickMember.kick({reason: args.slice(2).join(' ')})
            .then(() => {
                    
                const kickedEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('Successfully kicked `' + kickMember.user.tag + '`. Reason `' + args.slice(2).join(' ') + '`')

                return message.channel.send({embeds: [kickedEmbed]})
            })
        }
        
    }
}