const config = require('../../config.json')
const model = require('../../../models/discord/economy')

module.exports = {
    name: 'inv',

    alts: ['inventory'],

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})

        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        let inventory = new Array()
        myModel.inventory.forEach((inv) => {

            let toPush = {
                name: inv.name,
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