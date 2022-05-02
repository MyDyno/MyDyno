const config = require('../../config.json')

module.exports = {
    name: 'ban',

    execute(Discord, client, message, args, PREFIX){

        const banMember = message.mentions.members.first()
        
        if(!message.member.permissions.has('BAN_MEMBERS')){

            const noPermsEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have permission `BAN_MEMBERS` to ban!')

            return message.channel.send({ embeds: [noPermsEmbed] })
        }
        if(!message.guild.me.permissions.has('BAN_MEMBERS')){

            const noPermsEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('I dont have permission `BAN_MEMBERS` to ban!')

            return message.channel.send({ embeds: [noPermsEmbed] })
        }

        if(!args[1] || !banMember){

            const noBanMember = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Please mention someone to ban!\nUsage: `' + PREFIX + 'ban [@user] [reason]`')

            return message.channel.send({embeds: [noBanMember] })
        }

        if(banMember.permissions.has('BAN_MEMBERS')){

            const cantBanEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Couldn\'t ban because `' + banMember.user.tag + '` is a moderator!')
            return message.channel.send({embeds: [cantBanEmbed] })
        }

        if(!args.slice(2).join(' ')){
            banMember.ban({reason: null})
            .then(() => {
                    
                const bannedEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('Successfully banned `' + banMember.user.tag + '`')

                return message.channel.send({embeds: [bannedEmbed]})
            })
        }
        else{
            banMember.ban({reason: args.slice(2).join(' ')})
            .then(() => {
                    
                const bannedEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('Successfully banned `' + banMember.user.tag + '`. Reason `' + args.slice(2).join(' ') + '`')

                return message.channel.send({embeds: [bannedEmbed]})
            })
        }
        
    }
}