const model = require('../../../models/discord/economy')
const cooldownModel = require('../../../models/discord/cooldown')

module.exports = {
    name: 'fish',

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let cooldown = await cooldownModel.findOne({userId: message.author.id})
        let todayDate = new Date().getTime()
        let storeDate = Number(new Date().getTime()) + Number(client.config.fishCooldown)
        let randomMoney = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
     
        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        let fishingPole = myModel.inventory.find(item => item.indexValue == 1)

        if(!fishingPole){

            const notBought = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have a fishing pole to fish!')

            return message.channel.send({embeds: [notBought]})
        }

        if(cooldown.fishCooldown){

            if(Number(todayDate) >= Number(cooldown.fishCooldown)){

                updateCooldown()
                .then(() => {
                    fishCommand()
                })

            }
            else{
                onCooldown()
            }
        }
        else{

            updateCooldown()
            .then(() => {
                fishCommand()
            })
        }

        async function updateCooldown(){

            await cooldownModel.findOneAndUpdate(
                {userId: message.author.id},
                {
                    fishCooldown: storeDate
                }
            )

        }

        async function fishCommand(){

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

        function onCooldown(){

            let fishRemainingTime = Number(cooldown.fishCooldown) - Number(todayDate)
            let totalSeconds = (fishRemainingTime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);                

            const fishCooldownEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('🕕 You are in cooldown for: `' + days + ' days,` `' + hours + ' hours`, `' + minutes + ' minutes`, `' + seconds + ' seconds!`')
                .setTimestamp()
                .setFooter(client.user.username)

            message.channel.send({embeds: [fishCooldownEmbed]})
        }
    }
}