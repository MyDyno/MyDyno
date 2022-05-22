const model = require('../../../models/discord/economy')
const shopConfig = require('../../shop.json')

module.exports = {
    name: 'shop',

    alts: ['market'],

    async execute(Discord, client, message, args, PREFIX){
        
        let myModel = await model.findOne({userId: message.author.id})

        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        let shopItems = new Array()
        shopConfig.shop.forEach((item) => {

            let toPush = {
                name: item.emoji + item.name + ' - Price `' + client.config.currencyIcon + item.price + '`',
                value: '`' + PREFIX + 'buy ' + item.buyName + '`'
            }

            shopItems.push(toPush)

        })

        const shopEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription('To buy an item use the `buy` command, E.g. `' + PREFIX + 'buy [Item]`')
            .addFields(shopItems)
            .setTimestamp()
            .setFooter(client.user.username)

        message.channel.send({embeds: [shopEmbed]})

    }
}