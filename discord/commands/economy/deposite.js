const model = require('../../../models/discord/economy')

module.exports = {
    name: 'dep',
    alts: ['deposite'],
    requireEconomyAccount: true,

    async execute(Discord, client, message, args, PREFIX){
        
        let myModel = await model.findOne({userId: message.author.id})

        if(!args[1]){
                            
            const noArgs1 = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Please enter an amount of balance to deposite!')

            return message.channel.send({embeds: [noArgs1]})
        }

        if(isNaN(args[1])){

            const args1NAN = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('`' + args[1] + '` is not a number!')

            return message.channel.send({embeds: [args1NAN]})
        }

        if(args[1] > myModel.cash){

            const notEnoughCashEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have `' + client.config.currencyIcon + args[1] + '` in your account to deposite!')

            return message.channel.send({embeds: [notEnoughCashEmbed]})
        }

        model.findOneAndUpdate(
            {userId: message.author.id},
            {
                $inc:{
                   cash: -Number(args[1]),
                   bank: Number(args[1])
                }
            }
        )
        .then(() => {

            const depositeSuccessEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Successfully deposited `' + client.config.currencyIcon + args[1] + '`')

            message.channel.send({embeds: [depositeSuccessEmbed]})
        })
    }
}