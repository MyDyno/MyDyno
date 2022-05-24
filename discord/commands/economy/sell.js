const model = require('../../../models/discord/economy')
const shopConfig = require('../../shop.json')

module.exports = {
    name: 'sell',
    requireEconomyAccount: true,

    async execute(Discord, client, message, args, PREFIX){
        
        let myModel = await model.findOne({userId: message.author.id})

        if(!args.slice(1).join(' ')){

            const tooFewArgs1 = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Please enter an item to sell.\nUsage: `' + PREFIX + 'sell [Item]`')

            return message.channel.send({embeds: [tooFewArgs1]})
        }

        let sellItem = myModel.inventory.find(i => i.buyName == args.slice(1).join(' ').toLowerCase())

        if(sellItem){

            model.findOneAndUpdate(
                {userId: message.author.id},
                {
                    $inc:{
                        cash: Number(sellItem.sellingPrice),
                    },
                    $pull:{
                        inventory: sellItem
                    }
                }
            )
            .then(() => {

                const boughtEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('Successfully sold ' + sellItem.name + ' for `' + client.config.currencyIcon + sellItem.sellingPrice + '`')

                message.channel.send({embeds: [boughtEmbed]})
            })
        }
        else{

            const notBought = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You don\'t own any `' + args.slice(1).join(' ') + '`!')

            return message.channel.send({embeds: [notBought]})
        }
    }
}