const model = require('../../../models/discord/economy')

module.exports = {
    name: 'pay',

    alts: ['give'],

    async execute(Discord, client, message, args, PREFIX){
        
        let myModel = await model.findOne({userId: message.author.id})

        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        let mentionUser = message.mentions.users.first()
        if(!args[1] || !mentionUser){

            const noMentionUser = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Please mention a user to pay money!\nUsage: `' + PREFIX + 'pay [@user] [100]`')

            return message.channel.send({embeds: [noMentionUser]})
        }

        let mentionUserModel = await model.findOne({userId: mentionUser.id})
        if(!mentionUserModel){

            const userNoAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('The user does not have an account!')

            return message.channel.send({embeds: [userNoAccountEmbed]})
        }

        if(!args[2]){

            const noAmmount = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Please enter an amount to pay!\nUsage: `' + PREFIX + 'pay [@user] [100]`')

            return message.channel.send({embeds: [noAmmount]})
        }

        if(isNaN(args[2]) || args[2].startsWith('-')){

            const args2IsNotANumber = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('`' + args[2] + '` is eighter not a number or is negative!')

            return message.channel.send({embeds: [args2IsNotANumber]})
        }

        if(args[2] > myModel.cash){
                                        
            const notEnoughCash = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have enough cash to pay! Try `bal` command to check your balance!')

            return message.channel.send({embeds: [notEnoughCash]})
        }

        model.findOneAndUpdate(
            {userId: message.author.id},
            {
                $inc:{
                    cash: -Number(args[2])
                }
            }
        )
        .then(() => {

            model.findOneAndUpdate(
                {userId: mentionUser.id},
                {
                    $inc:{
                        cash: Number(args[2])
                    }
                }
            )
            .then(() => {

                const payedCash = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('Successfully payed `' + client.config.currencyIcon + args[2] + '` to `' + mentionUser.tag + '`')

                message.channel.send({embeds: [payedCash]})
            })
        })

    }
}