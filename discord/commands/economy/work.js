const config = require('../../config.json')
const model = require('../../../models/discord/economy')
const cooldownModel = require('../../../models/discord/cooldown')

module.exports = {
    name: 'work',

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let cooldown = await cooldownModel.findOne({userId: message.author.id})
        let todayDate = new Date().getTime()
        let storeDate = Number(new Date().getTime()) + Number(config.workCooldown)
        let randomMoney = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;

        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        if(cooldown.workCooldown){

            if(Number(todayDate) >= Number(cooldown.workCooldown)){
    
                updateCooldown()
                .then(() => {
                    workCommand()
                })
    
            }
            else{
                onCooldown()
            }
        }
        else{

            updateCooldown()
            .then(() => {
                workCommand()
            })
        }

        async function updateCooldown(){

            await cooldownModel.findOneAndUpdate(
                {userId: message.author.id},
                {
                    workCooldown: storeDate
                }
            )

        }

        async function workCommand(){

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
                    .setDescription('✅ You earned `' + config.currencyIcon + randomMoney + '` by working!')
                    .setTimestamp()
                    .setFooter(client.user.username);
    
                message.channel.send({embeds: [workEarnedEmbed]})
            })
        }

        function onCooldown(){

            let workRemainingTime = Number(cooldown.workCooldown) - Number(todayDate)
            let totalSeconds = (workRemainingTime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);                

            const workCooldownEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('🕕 You are in cooldown for: `' + days + ' days,` `' + hours + ' hours`, `' + minutes + ' minutes`, `' + seconds + ' seconds!`')
                .setTimestamp()
                .setFooter(client.user.username)

            message.channel.send({embeds: [workCooldownEmbed]})
        }
           
    }
}