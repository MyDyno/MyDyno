const config = require('../../config.json')
const model = require('../../../models/discord/economy')
const fetch = require('node-fetch')
const cooldownModel = require('../../../models/discord/cooldown')

module.exports = {
    name: 'quiz',

    async execute(Discord, client, message, args, PREFIX){
        
        let myModel = await model.findOne({userId: message.author.id})
        let cooldown = await cooldownModel.findOne({userId: message.author.id})
        let todayDate = new Date().getTime()
        let storeDate = Number(new Date().getTime()) + Number(config.quizCooldown)
        let quiz_type_api_link = "https://opentdb.com/api.php?amount=5&category=9&type=boolean";
        let randomMoney = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
     
        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        if(cooldown.quizCooldown){

            if(Number(todayDate) >= Number(cooldown.quizCooldown)){

                updateCooldown()
                .then(() => {
                    quizCommand()
                })

            }
            else{
                onCooldown()
            }
        }
        else{

            updateCooldown()
            .then(() => {
                quizCommand()
            })
        }

        async function updateCooldown(){

            await cooldownModel.findOneAndUpdate(
                {userId: message.author.id},
                {
                    quizCooldown: storeDate
                }
            )

        }

        async function quizCommand(){

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
                                                value: '✅ Yey you got the correct answer and won `' + config.currencyIcon + randomMoney + '`!',
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
                                                value: '✅ Yey you got the correct answer and won `' + config.currencyIcon + randomMoney + '`!',
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

        function onCooldown(){

            let quizRemainingTime = Number(cooldown.quizCooldown) - Number(todayDate)
            let totalSeconds = (quizRemainingTime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);                

            const quizCooldownEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('🕕 You are in cooldown for: `' + days + ' days,` `' + hours + ' hours`, `' + minutes + ' minutes`, `' + seconds + ' seconds!`')
                .setTimestamp()
                .setFooter(client.user.username)

            message.channel.send({embeds: [quizCooldownEmbed]})
        }

    }
}