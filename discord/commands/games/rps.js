const config = require('../../config.json')
const model = require('../../../models/discord/economy')
const cooldownModel = require('../../../models/discord/cooldown')

module.exports = {
    name: 'rps',

    alts: ['rockpaperscissor'],

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let cooldown = await cooldownModel.findOne({userId: message.author.id})
        let todayDate = new Date().getTime()
        let storeDate = Number(new Date().getTime()) + Number(config.rpsCooldown)
        let randomMoney = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
     
        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        if(cooldown.rpsCooldown){

            if(Number(todayDate) >= Number(cooldown.rpsCooldown)){

                updateCooldown()
                .then(() => {
                    rpsCommand()
                })

            }
            else{
                onCooldown()
            }
        }
        else{

            updateCooldown()
            .then(() => {
                rpsCommand()
            })
        }

        async function updateCooldown(){

            await cooldownModel.findOneAndUpdate(
                {userId: message.author.id},
                {
                    rpsCooldown: storeDate
                }
            )

        }

        async function rpsCommand(){

            const rps_embed = new Discord.MessageEmbed()
                .setTitle('Rock, Paper, Scissor')
                .setColor('BLUE')
                .setDescription('React to play the game!')
                .setTimestamp()
                .setFooter(client.user.username);
    
            message.channel.send({embeds: [rps_embed]})
            .then((r_message) => {
    
                r_message.react('🧱').then(r_message.react('✂').then(r_message.react('📰')));
    
                const filter = (reaction, user) => {
                    return ['🧱', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
                }
    
                const bot_choice = ['🧱', '✂', '📰']
                const random_bot_choice = bot_choice[Math.floor(Math.random() * bot_choice.length)]
    
                r_message.awaitReactions({filter, max: 1, time: 60000, error: ["time"] })
                .then(async (collected) => {
                    const reaction = collected.first()
    
                    if ((random_bot_choice === "✂" && reaction.emoji.name === "🧱") || (random_bot_choice === "🧱" && reaction.emoji.name === "📰") || (random_bot_choice === "📰" && reaction.emoji.name === "✂")){
    
                        model.findOneAndUpdate(
                            {userId: message.author.id},
                            {
                                $inc:{
                                    cash: randomMoney
                                }
                            }
                        )
                        .then(() => {
    
                            const rps_won_embed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                                .setDescription(
                                    '✅ Yey you won `' + config.currencyIcon + randomMoney + '`' + 
                                    '\n\n ' + 
                                    'Choices:' + 
                                    '\nYou chose ' + reaction.emoji.name + ',  and I chose ' + random_bot_choice + '!'
                                )
                                .setTimestamp()
                                .setFooter(client.user.username);
    
                            r_message.edit({embeds: [rps_won_embed]})
                            .then(() => {
                                r_message.reactions.removeAll();
                            });
                        })
                    }
                    else if (random_bot_choice === reaction.emoji.name){
    
                        const rps_tie_embed = new Discord.MessageEmbed()
                            .setColor('BLUE')
                            .setAuthor(message.author.tag, message.author.displayAvatarURL())
                            .setDescription(
                                '🚫 Its a tie!.' + 
                                '\n\n ' + 
                                'Choices:' + 
                                '\nYou chose ' + reaction.emoji.name + ',  and I chose ' + random_bot_choice + '!'
                            )
                            .setTimestamp()
                            .setFooter(client.user.username);
                    
                        r_message.edit({embeds: [rps_tie_embed]})
                        .then(() => {
                            r_message.reactions.removeAll();
                        })
                    }
                    else{
    
                        const rps_loose_embed = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setAuthor(message.author.tag, message.author.displayAvatarURL())
                            .setDescription(
                                '❌ Your lost it!.' + 
                                '\n\n ' + 'Choices:' + 
                                '\nYou chose ' + reaction.emoji.name + ',  and I chose ' + random_bot_choice + '!'
                            )
                            .setTimestamp()
                            .setFooter(client.user.username);
                    
                        r_message.edit({embeds: [rps_loose_embed]})
                        .then(() => {
                            r_message.reactions.removeAll();
                        });
                    }
                })
                .catch(collected => {
                    
                    const no_response = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setDescription('❌ Game has been cancelled since you did not reposnd in time!')
                        .setTimestamp()
                        .setFooter(client.user.username);
    
                    r_message.edit({embeds: [no_response]})
                    .then(() => {
                        r_message.reactions.removeAll();
                    });
                })
            })
        }

        function onCooldown(){

            let rpsRemainingTime = Number(cooldown.rpsCooldown) - Number(todayDate)
            let totalSeconds = (rpsRemainingTime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);                

            const rpsCooldownEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('🕕 You are in cooldown for: `' + days + ' days,` `' + hours + ' hours`, `' + minutes + ' minutes`, `' + seconds + ' seconds!`')
                .setTimestamp()
                .setFooter(client.user.username)

            message.channel.send({embeds: [rpsCooldownEmbed]})
        }

    }
}