const model = require('../../../models/discord/economy')
const fetch = require('node-fetch')
const earnings = require('../../earnings.json')

module.exports = {
    name: 'quiz',
    requireEconomyAccount: true,
    cooldown: 20 * 1000,

    async execute(Discord, client, message, args, PREFIX){
        
        let quiz_type_api_link = "https://opentdb.com/api.php?amount=5&category=9&type=boolean";
        let randomMoney = Math.floor(Math.random() * (earnings.quizHighRange - earnings.quizLowRange + 1)) + earnings.quizLowRange;

        let response = await fetch(quiz_type_api_link);
        const data = await response.json();
        var length = data.results.length;
        var randomNumber = Math.floor(Math.random() * length);
        var randomQuestion = data.results[randomNumber];
        var question = randomQuestion.question;
        var correctAnswer = randomQuestion.correct_answer;

        if (correctAnswer == 'True') {
            correctAnswer = '✅'
        }
        else if (correctAnswer == 'False') {
            correctAnswer = '❌'
        }

        const quiz_embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor('BLUE')
            .addFields(
                {
                    name: 'Question',
                    value: question,
                    inline: false,
                },
                {
                    name: 'Result',
                    value: 'Waiting for reaction...',
                    inline: false,
                }
            )   
            .setTimestamp()
            .setFooter(client.user.username)
        message.channel.send({embeds: [quiz_embed]})
        .then((q_message) => {
            q_message.react('✅').then(q_message.react('❌'))
            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            }
            q_message.awaitReactions({filter, max: 1, time: 60000, error: ["time"] })
                .then(async (collected) => {
                    const reaction = collected.first()
                    if (reaction.emoji.name == '✅' && correctAnswer == '✅') {
                        model.findOneAndUpdate(
                            {userId: message.author.id},
                            {
                                $inc:{
                                    cash: randomMoney
                                }
                            }
                        )
                        .then(() => {
                            const quiz_won_embed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                                .addFields(
                                    {
                                        name: 'Question',
                                        value: question,
                                        inline: false,
                                    },
                                    {
                                        name: 'Result',
                                        value: '✅ Yey you got the correct answer and won `' + client.config.currencyIcon + randomMoney + '`!',
                                        inline: false,
                                    }
                                )
                                .setTimestamp()
                                .setFooter(client.user.username);
                            q_message.edit({embeds: [quiz_won_embed]})
                        })
                    }
                    else if (reaction.emoji.name == '❌' && correctAnswer == '❌') {
                        model.findOneAndUpdate(
                            {userId: message.author.id},
                            {
                                $inc:{
                                    cash: randomMoney
                                }
                            }
                        )
                        .then(() => {
                            const quiz_won_embed = new Discord.MessageEmbed()
                                .setColor('GREEN')
                                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                                .addFields(
                                    {
                                        name: 'Question',
                                        value: question,
                                        inline: false,
                                    },
                                    {
                                        name: 'Result',
                                        value: '✅ Yey you got the correct answer and won `' + client.config.currencyIcon + randomMoney + '`!',
                                        inline: false,
                                    }
                                )
                                .setTimestamp()
                                .setFooter(client.user.username);
                            q_message.edit({embeds: [quiz_won_embed]})
                        })
                    }
                    else if (reaction.emoji.name == '✅' && correctAnswer == '❌') {
                        const quiz_lost_embed = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setAuthor(message.author.tag, message.author.displayAvatarURL())
                            .addFields(
                                {
                                    name: 'Question',
                                    value: question,
                                    inline: false,
                                },
                                {
                                    name: 'Result',
                                    value: '❌ No you got the wrong answer!',
                                    inline: false,
                                }
                            )
                            .setTimestamp()
                            .setFooter(client.user.username);
                        q_message.edit({embeds: [quiz_lost_embed]})
                    }
                    else if (reaction.emoji.name == '❌' && correctAnswer == '✅') {
                        const quiz_won_embed = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setAuthor(message.author.tag, message.author.displayAvatarURL())
                            .addFields(
                                {
                                    name: 'Question',
                                    value: question,
                                    inline: false,
                                },
                                {
                                    name: 'Result',
                                    value: '❌ No you got the wrong answer!',
                                    inline: false,
                                }
                            )
                            .setTimestamp()
                            .setFooter(client.user.username);
                        q_message.edit({embeds: [quiz_lost_embed]})
                    }
                })
                .catch(collected => {
                    const no_response = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .addFields(
                            {
                                name: 'Question',
                                value: question,
                                inline: false,
                            },
                            {
                                name: 'Result',
                                value: '❌ Quiz has been cancelled since you did not reposnd in time!',
                                inline: false,
                            }
                        )
                        .setTimestamp()
                        .setFooter(client.user.username);
                        q_message.edit({embeds: [no_response]})
                    .then(() => {
                        q_message.reactions.removeAll();
                    });
                })
        })
    }
}