const model = require('../../../models/discord/economy')
const earnings = require('../../earnings.json')

module.exports = {
    name: 'dig',
    requireEconomyAccount: true,
    cooldown: 60 * 60 * 1000,

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let randomMoney = Math.floor(Math.random() * (earnings.digHighRange - earnings.digLowRange + 1)) + earnings.digLowRange;
        let shovel = myModel.inventory.find(item => item.buyName == 'shovel')

        if(!shovel){

            const notBought = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have a shovel to dig!')

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

            const digEarnedEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('✅ You earned `' + client.config.currencyIcon + randomMoney + '` by diging!')
                .setTimestamp()
                .setFooter(client.user.username);

            message.channel.send({embeds: [digEarnedEmbed]})
        })
    }
}