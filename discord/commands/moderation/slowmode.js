module.exports = {
    name: 'slowmode',
    alts: ['slowmo'],

    execute(Discord, client, message, args, PREFIX){
        
        if(!message.member.permissions.has('MANAGE_CHANNELS')){

            const noPermissionEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have permission `MANAGE_CHANNELS` to manage slowmode!')

            return message.channel.send({ embeds: [noPermissionEmbed] })
        }

        if(!message.guild.me.permissions.has('MANAGE_CHANNELS')){

            const noPermissionEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('I dont have permission `MANAGE_CHANNELS` to manage slowmode!')

            return message.channel.send({ embeds: [noPermissionEmbed] })
        }

        if(!args[1]){

            const noArgs1Embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Please enter the slowmode!\nUsage: `' + PREFIX + 'slowmode [seconds]`')

            return message.channel.send({ embeds: [noArgs1Embed] })
        }
        
        if(isNaN(args[1])){

            const args1NotANumberEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('`' + args[1] + '` is not a number!\nUsage: `' + PREFIX + 'slowmode [15]`')

            return message.channel.send({ embeds: [args1NotANumberEmbed] })
        }

        if(args[1] > 21600){

            const args1GreaterEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Slowmode limit `21600`')

            return message.channel.send({ embeds: [args1GreaterEmbed] })
        }

        message.channel.setRateLimitPerUser(Number(args[1]))
        .then(() => {
            message.channel.send('Slowmode set to `' + args[1] + ' seconds!`')
        })
        
    }
}