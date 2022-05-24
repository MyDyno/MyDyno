module.exports = {
    name: 'purge',
    permissions: ['MANAGE_MESSAGES'],

    execute(Discord, client, message, args, PREFIX){

        if(!message.member.permissions.has('MANAGE_MESSAGES')){

            const noPermsEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have permission `MANAGE_MESSAGES` to purge!')

            return message.channel.send({ embeds: [noPermsEmbed] })
        }
        
        if(!args[1]){

            const noAmountMessage = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Please enter an amount of message to clear/purge\nUsage: `' + PREFIX + 'clear` [amount]')

            return message.channel.send({ embeds: [noAmountMessage] })
        }

        if(isNaN(args[1])){

            const args1NotANumberEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('` ' + args[1] + '` is not a number!\nUsage: `' + PREFIX + 'clear [10]`')

            return message.channel.send({ embeds: [args1NotANumberEmbed] })
        }

        let msgToDelete = Number(args[1]) + Number(1)
        message.channel.bulkDelete(msgToDelete)
        .then(() => {

            message.channel.send('Successfully deleted `' + args[1] + '` messages!')
            .then((msg) => {
                setTimeout(() => {
                    msg.delete()
                }, 2000)
            })
        })
        .catch((err) => {
            message.channel.send('There was a problem! Couldn\'t delete!\nNote: You cannot delete messages older than 14 days!')
        })
    }
}