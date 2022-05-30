const model = require('../../../models/discord/economy')
const earnings = require('../../earnings.json')

module.exports = {
    name: 'daily',
    requireEconomyAccount: true,
    cooldown: 24 * 60 * 60 * 1000,

    async execute(Discord, client, message){

        let randomMoney = Math.floor(Math.random() * (earnings.dailyHighRange - earnings.dailyLowRange + 1)) + earnings.dailyLowRange;

        await model.findOneAndUpdate(
            {userId: message.author.id},
            {
                $inc: {
                    cash: randomMoney
                }
            }
        )
        .then(() => {

            const EarnedEmbed = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('✅ You recieved your daily `' + client.config.currencyIcon + randomMoney + '`')
                .setTimestamp()
                .setFooter({text: client.user.username});

            message.channel.send({embeds: [EarnedEmbed]})
        })           
    }
}