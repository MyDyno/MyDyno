const model = require('../../../models/discord/economy')
const earnings = require('../../earnings.json')

module.exports = {
    name: 'hunt',
    requireEconomyAccount: true,
    cooldown: 60 * 60 * 1000,

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let randomMoney = Math.floor(Math.random() * (earnings.huntHighRange - earnings.huntLowRange + 1)) + earnings.huntLowRange;
        let huntingRifle = myModel.inventory.find(item => item.buyName == 'huntingrifle')

        if(!huntingRifle){

            const notBought = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have a hunting rifle to hunt!')

            return message.channel.send({embeds: [notBought]})
        }

        await model.findOneAndUpdate(
            {userId: message.author.id},
            {
                $inc: {
                    cash: randomMoney
                }
            }
        )
        .then(() => {

            const huntEarnedEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('✅ You earned `' + client.config.currencyIcon + randomMoney + '` by hunting!')
                .setTimestamp()
                .setFooter({text: client.user.username});

            message.channel.send({embeds: [huntEarnedEmbed]})
        })
    }
}