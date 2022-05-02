const config = require('../../config.json')

module.exports = {
    name: 'purge',

    execute(Discord, client, message, args, PREFIX){
        
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
            message.channel.send('There was a problem! Couldn\'t delete!')
        })
    }
}