const model = require('../../../models/discord/economy')
const shopConfig = require('../../shop.json')

module.exports = {
    name: 'shop',
    alts: ['market'],
    requireEconomyAccount: true,

    async execute(Discord, client, message, args, PREFIX){

        let shopItems = new Array()
        shopConfig.shop.forEach((item) => {

            let toPush = {
                name: item.emoji + ' ' + item.name + ' - Price `' + client.config.currencyIcon + item.price + '`',
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