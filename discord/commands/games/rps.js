module.exports = {
    name: 'rps',
    alts: ['rockpaperscissor'],
    cooldown: 5 * 1000,

    async execute(Discord, client, message){

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

                    const rps_won_embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setDescription(
                            '✅ Yey you won!' + 
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
                }
                else if (random_bot_choice === reaction.emoji.name){

                    const rps_tie_embed = new Discord.MessageEmbed()
                        .setColor('BLUE')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setDescription(
                            '🚫 Its a tie!' + 
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
                            '❌ You lost it!' + 
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