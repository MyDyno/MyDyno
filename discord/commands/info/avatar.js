module.exports = {
    name: 'avatar',
    alts: ['av'],

    execute(Discord, client, message, args, PREFIX){
        
        let user = message.mentions.users.first() || message.author

        message.channel.send({embeds: [

            new Discord.MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL())
                .setTitle('Avatar Link')
                .setURL(user.displayAvatarURL() + '?size=1024')
                .setColor('BLUE')
                .setImage(user.displayAvatarURL() + '?size=1024')
                .setFooter({text: 'Requested by ' + message.author.tag})

        ]})
        
    }
}