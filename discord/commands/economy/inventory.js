const model = require('../../../models/discord/economy')

module.exports = {
    name: 'inv',
    requireEconomyAccount: true,
    alts: ['inventory'],

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})

        let inventory = new Array()
        myModel.inventory.forEach((inv) => {

            let toPush = {
                name: inv.emoji + ' ' + inv.name + ' - Selling Price `' + client.config.currencyIcon + inv.sellingPrice + '`',
                value: inv.description
            }
            inventory.push(toPush)
        })

        const inventoryEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .addFields(inventory)
            .setTimestamp()
            .setFooter(client.user.username)

        if(inventory.length == 0){
            inventoryEmbed.setDescription('❌ You dont own any items yet!')
        }
        else{
            inventoryEmbed.setDescription('Check the items you own!')
        }

        message.channel.send({embeds: [inventoryEmbed]})

    }
}