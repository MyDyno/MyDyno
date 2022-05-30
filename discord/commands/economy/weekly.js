const model = require('../../../models/discord/economy')
const earnings = require('../../earnings.json')

module.exports = {
    name: 'weekly',
    requireEconomyAccount: true,
    cooldown: 7 * 24 * 60 * 60 * 1000,

    async execute(Discord, client, message){

        let randomMoney = Math.floor(Math.random() * (earnings.weeklyHighRange - earnings.weeklyLowRange + 1)) + earnings.weeklyLowRange;

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
                .setDescription('✅ You recieved your weekly `' + client.config.currencyIcon + randomMoney + '`')
                .setTimestamp()
                .setFooter({text: client.user.username});

            message.channel.send({embeds: [EarnedEmbed]})
        })           
    }
}