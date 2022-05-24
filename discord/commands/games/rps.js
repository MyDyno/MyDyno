const model = require('../../../models/discord/economy')
const earnings = require('../../earnings.json')

module.exports = {
    name: 'rps',
    cooldown: 20 * 1000,
    requireEconomyAccount: true,
    alts: ['rockpaperscissor'],

    async execute(Discord, client, message){
        
        let randomMoney = Math.floor(Math.random() * (earnings.rpsHighRange - earnings.rpsLowRange + 1)) + earnings.rpsLowRange;

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
                                '✅ Yey you won `' + client.config.currencyIcon + randomMoney + '`' + 
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
}