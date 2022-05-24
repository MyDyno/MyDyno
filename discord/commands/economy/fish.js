const model = require('../../../models/discord/economy')
const earnings = require('../../earnings.json')

module.exports = {
    name: 'fish',
    cooldown: 60 * 60 * 1000,
    requireEconomyAccount: true,

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let randomMoney = Math.floor(Math.random() * (earnings.fishHighRange - earnings.fishLowRange + 1)) + earnings.fishLowRange;
        let fishingPole = myModel.inventory.find(item => item.buyName == 'fishingpole')

        if(!fishingPole){

            const notBought = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have a fishing pole to fish!')

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

            const fishEarnedEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('✅ You earned `' + client.config.currencyIcon + randomMoney + '` by fishing!')
                .setTimestamp()
                .setFooter(client.user.username);

            message.channel.send({embeds: [fishEarnedEmbed]})
        })
    }
}