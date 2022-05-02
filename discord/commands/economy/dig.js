const model = require('../../../models/discord/economy')
const cooldownModel = require('../../../models/discord/cooldown')

module.exports = {
    name: 'dig',

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let cooldown = await cooldownModel.findOne({userId: message.author.id})
        let todayDate = new Date().getTime()
        let storeDate = Number(new Date().getTime()) + Number(client.config.digCooldown)
        let randomMoney = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
     
        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        let shovel = myModel.inventory.find(item => item.indexValue == 3)

        if(!shovel){

            const notBought = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have a shovel to dig!')

            return message.channel.send({embeds: [notBought]})
        }

        if(cooldown.digCooldown){

            if(Number(todayDate) >= Number(cooldown.digCooldown)){

                updateCooldown()
                .then(() => {
                    digCommand()
                })

            }
            else{
                onCooldown()
            }
        }
        else{

            updateCooldown()
            .then(() => {
                digCommand()
            })
        }

        async function updateCooldown(){

            await cooldownModel.findOneAndUpdate(
                {userId: message.author.id},
                {
                    digCooldown: storeDate
                }
            )

        }

        async function digCommand(){

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

        function onCooldown(){

            let digRemainingTime = Number(cooldown.digCooldown) - Number(todayDate)
            let totalSeconds = (digRemainingTime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);                

            const digCooldownEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('🕕 You are in cooldown for: `' + days + ' days,` `' + hours + ' hours`, `' + minutes + ' minutes`, `' + seconds + ' seconds!`')
                .setTimestamp()
                .setFooter(client.user.username)

            message.channel.send({embeds: [digCooldownEmbed]})
        }
    }
}