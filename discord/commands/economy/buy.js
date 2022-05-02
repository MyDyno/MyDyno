const config = require('../../config.json')
const model = require('../../../models/discord/economy')
const shopConfig = require('../../shop.json')

module.exports = {
    name: 'buy',

    async execute(Discord, client, message, args, PREFIX){
        
        let myModel = await model.findOne({userId: message.author.id})

        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        if(!args.slice(1).join(' ')){

            const tooFewArgs1 = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Please enter an item to buy.\nUsage: `' + PREFIX + 'buy [Item]`')

            return message.channel.send({embeds: [tooFewArgs1]})
        }

        let buyItem = shopConfig.shop.find(i => i.buyName == args.slice(1).join(' ').toLowerCase())

        if(buyItem){

            let itemInInventory = myModel.inventory.find(i => i.indexValue == buyItem.indexValue)
            if(itemInInventory){

                const alreadyBought = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('You already have a ' + buyItem.name + ' in your inventory!')

                return message.channel.send({embeds: [alreadyBought]})
            }

            if(buyItem.price > myModel.cash){

                const notEnoughCash = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('You dont have `' + config.currencyIcon + buyItem.price + '` to buy ' + buyItem.name + '.\nTry `bal` command to check your balance!')

                return message.channel.send({embeds: [notEnoughCash]})
            }

            model.findOneAndUpdate(
                {userId: message.author.id},
                {
                    $inc:{
                        cash: -Number(buyItem.price),
                    },
                    $push:{
                        inventory: 
                        {
                            name: buyItem.name,
                            buyName: buyItem.buyName,
                            description: buyItem.description,
                            indexValue: buyItem.indexValue,
                            price: buyItem.price,
                            sellingPrice: buyItem.sellingPrice
                        }
                    }
                }
            )
            .then(() => {

                const boughtEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('Successfully bought ' + buyItem.name + ' for `' + config.currencyIcon + buyItem.price + '`')

                message.channel.send({embeds: [boughtEmbed]})
            })
        }
        else{

            const itemNotFound = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('`' + args.slice(1).join(' ') + '` not available in the shop! Try `shop` command to check available items!')

            message.channel.send({embeds: [itemNotFound]})
        }
    }
}