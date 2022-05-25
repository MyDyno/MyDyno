const model = require('../../../models/discord/economy')
const earnings = require('../../earnings.json')

module.exports = {
    name: 'work',
    requireEconomyAccount: true,
    cooldown: 4 * 60 * 60 * 1000,

    async execute(Discord, client, message){

        let randomMoney = Math.floor(Math.random() * (earnings.workHighRange - earnings.workLowRange + 1)) + earnings.workHighRange;
        
        await model.findOneAndUpdate(
            {userId: message.author.id},
            {
                $inc: {
                    cash: randomMoney
                }
            }
        )
        .then(() => {

            const workEarnedEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('✅ You earned `' + client.config.currencyIcon + randomMoney + '` by working!')
                .setTimestamp()
                .setFooter(client.user.username);

            message.channel.send({embeds: [workEarnedEmbed]})
        })         
    }
}