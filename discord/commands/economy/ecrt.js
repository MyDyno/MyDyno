const model = require('../../../models/discord/economy')
const cooldownModel = require('../../../models/discord/cooldown')

module.exports = {
    name: 'ecrt',

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})

        if(myModel){

            const hasEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('Your account is already open!')

            return message.channel.send({embeds: [hasEconomyAccountEmbed]})
        }

        let createdModel = await model.create({
            userId: message.author.id,
            cash: 0,
            bank: 0,
            inventory: []
        })

        let createdCooldown = await cooldownModel.create({
            userId: message.author.id,
        })

        createdModel.save()
        .then(() => {
            createdCooldown.save()
            .then(() => {
                const createdEconomyAccountEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('✅ Your account was successfully created!')
    
                message.channel.send({embeds: [createdEconomyAccountEmbed]})
            })
            .catch(() => {
                const errorCreateEconomyAccountEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('❌ Couldn\'t create your account, please try again!!')
    
                message.channel.send({embeds: [errorCreateEconomyAccountEmbed]})
            })
        })
        .catch(() => {
            const errorCreateEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('❌ Couldn\'t create your account, please try again!!')

            message.channel.send({embeds: [errorCreateEconomyAccountEmbed]})
        })
    }
}