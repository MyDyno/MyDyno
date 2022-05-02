const model = require('../../../models/discord/economy')
const cooldownModel = require('../../../models/discord/cooldown')

module.exports = {
    name: 'daily',

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let cooldown = await cooldownModel.findOne({userId: message.author.id})
        let todayDate = new Date().getTime()
        let storeDate = Number(new Date().getTime()) + Number(client.config.dailyCooldown)
        let randomMoney = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        if(cooldown.dailyCooldown){

            if(Number(todayDate) >= Number(cooldown.dailyCooldown)){
    
                updateCooldown()
                .then(() => {
                    dailyCommand()
                })
    
            }
            else{
                onCooldown()
            }
        }
        else{

            updateCooldown()
            .then(() => {
                dailyCommand()
            })
        }

        async function updateCooldown(){

            await cooldownModel.findOneAndUpdate(
                {userId: message.author.id},
                {
                    dailyCooldown: storeDate
                }
            )

        }

        async function dailyCommand(){

            await model.findOneAndUpdate(
                {userId: message.author.id},
                {
                    $inc: {
                        cash: randomMoney
                    }
                }
            )
            .then(() => {
    
                const dailyEarnedEmbed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setDescription('✅ You recieved your daily `' + client.config.currencyIcon + randomMoney + '`')
                    .setTimestamp()
                    .setFooter(client.user.username);
    
                message.channel.send({embeds: [dailyEarnedEmbed]})
            })
        }

        function onCooldown(){

            let dailyRemainingTime = Number(cooldown.dailyCooldown) - Number(todayDate)
            let totalSeconds = (dailyRemainingTime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);                

            const dailyCooldownEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('🕕 You are in cooldown for: `' + days + ' days,` `' + hours + ' hours`, `' + minutes + ' minutes`, `' + seconds + ' seconds!`')
                .setTimestamp()
                .setFooter(client.user.username)

            message.channel.send({embeds: [dailyCooldownEmbed]})
        }
           
    }
}