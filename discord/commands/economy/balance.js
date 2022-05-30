const model = require('../../../models/discord/economy')

module.exports = {
    name: 'bal',
    requireEconomyAccount: true,
    alts: ['balance'],

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})

        let mentionUser = message.mentions.users.first() 
        if(!mentionUser){

            const balEmbed = new Discord.MessageEmbed()                
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .addFields(
                    {   
                        name: 'Cash',
                        value: client.config.currencyIcon + myModel.cash,
                        inline: true,
                    },
                    {
                        name: 'Bank',
                        value: client.config.currencyIcon + myModel.bank,
                        inline: true,
                    },
                )
                .setTimestamp()
                .setFooter({text: client.user.username})    
                
            message.channel.send({embeds: [balEmbed]})
        }
        else{

            let mentionUserModel = await model.findOne({userId: mentionUser.id})

            if(!mentionUserModel){

                const userNoAccountEmbed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('The user does not have an account!')

                return message.channel.send({embeds: [userNoAccountEmbed]})
            }

            const mentionUserBalEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(mentionUser.tag, mentionUser.displayAvatarURL())
                .addFields(
                    {
                        name: 'Cash',
                        value: client.config.currencyIcon + mentionUserModel.cash,
                        inline: true,
                    },
                    {
                        name: 'Bank',
                        value: client.config.currencyIcon + mentionUserModel.bank,
                        inline: true,
                    },
                )
                .setTimestamp()
                .setFooter({text: client.user.username})

            message.channel.send({embeds: [mentionUserBalEmbed]})
        }
    }
}