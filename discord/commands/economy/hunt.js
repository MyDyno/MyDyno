const model = require('../../../models/discord/economy')
const cooldownModel = require('../../../models/discord/cooldown')

module.exports = {
    name: 'hunt',

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let cooldown = await cooldownModel.findOne({userId: message.author.id})
        let todayDate = new Date().getTime()
        let storeDate = Number(new Date().getTime()) + Number(client.config.huntCooldown)
        let randomMoney = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
     
        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        let huntingRifle = myModel.inventory.find(item => item.indexValue == 2)

        if(!huntingRifle){

            const notBought = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have a hunting rifle to hunt!')

            return message.channel.send({embeds: [notBought]})
        }

        if(cooldown.huntCooldown){
            
            if(Number(todayDate) >= Number(cooldown.huntCooldown)){
    
                updateCooldown()
                .then(() => {
                    huntCommand()
                })
    
            }
            else{
                onCooldown()
            }
        }
        else{

            updateCooldown()
            .then(() => {
                huntCommand()
            })
        }

        async function updateCooldown(){

            await cooldownModel.findOneAndUpdate(
                {userId: message.author.id},
                {
                    huntCooldown: storeDate
                }
            )

        }

        async function huntCommand(){

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
                    .setFooter(client.user.username);
    
                message.channel.send({embeds: [huntEarnedEmbed]})
            })
        }

        function onCooldown(){

            let huntRemainingTime = Number(cooldown.huntCooldown) - Number(todayDate)
            let totalSeconds = (huntRemainingTime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);                

            const huntCooldownEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('🕕 You are in cooldown for: `' + days + ' days,` `' + hours + ' hours`, `' + minutes + ' minutes`, `' + seconds + ' seconds!`')
                .setTimestamp()
                .setFooter(client.user.username)

            message.channel.send({embeds: [huntCooldownEmbed]})
        }
    }
}