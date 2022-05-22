const model = require('../../../models/discord/economy')
const cooldownModel = require('../../../models/discord/cooldown')

module.exports = {
    name: 'edel',

    async execute(Discord, client, message){
        
        let myModel = await model.findOne({userId: message.author.id})
        let cooldown = await cooldownModel.findOne({userId: message.author.id})

        if(!myModel){

            const noEconomyAccountEmbed = new Discord.MessageEmbed()
                .setColor('RED')
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription('You dont have an account!, Use `ecrt` command to create one!')

            return message.channel.send({embeds: [noEconomyAccountEmbed]})
        }

        const dangerEdel = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription('`Danger, Will Robinson, Danger! This cannot be undone.`\n\nReact with ✅ to proceed!')

        message.channel.send({embeds: [dangerEdel]})
        .then((embedMsg) => {

            embedMsg.react('✅').then(embedMsg.react('❌'))

                const filter = (reaction, user) => {
                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                }

                embedMsg.awaitReactions({filter, max: 1, time: 60000, errors: ["time"] })
                .then(async (collected) => {
                        

                        const reaction = collected.first()
            
                        if(reaction.emoji.name == '✅'){
                            
                            myModel.delete()
                            .then(() => {
                                cooldown.delete()
                                .then(() => {
                                    const deletedEconomyAccountEmbed = new Discord.MessageEmbed()
                                        .setColor('GREEN')
                                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                                        .setDescription('✅ Your account was successfully deleted!')
    
                                    embedMsg.edit({embeds: [deletedEconomyAccountEmbed]})
                                    .then(() => {
                                        embedMsg.reactions.removeAll()
                                    })
                                })
                                .catch(() => {

                                    const errorDeleteEconomyAccountEmbed = new Discord.MessageEmbed()
                                        .setColor('GREEN')
                                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                                        .setDescription('❌ Couldn\'t delete you account, please try again!!')
    
                                    embedMsg.edit({embeds: [errorDeleteEconomyAccountEmbed]})
                                    .then(() => {
                                        embedMsg.reactions.removeAll()
                                    })
                                })
                            })
                            .catch(() => {

                                const errorDeleteEconomyAccountEmbed = new Discord.MessageEmbed()
                                    .setColor('GREEN')
                                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                                    .setDescription('❌ Couldn\'t delete you account, please try again!!')

                                embedMsg.edit({embeds: [errorDeleteEconomyAccountEmbed]})
                                .then(() => {
                                    embedMsg.reactions.removeAll()
                                })
                            })
                            
                        }
                        else if(reaction.emoji.name == '❌'){
                            
                            const cancelledDeleteEconomyAccountEmbed = new Discord.MessageEmbed()
                                .setColor('RED')
                                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                                .setDescription('❌ Account deletation cancelled!') 

                            embedMsg.edit({embeds: [cancelledDeleteEconomyAccountEmbed]})
                            .then(() => {
                                embedMsg.reactions.removeAll()
                            })
                        }
            
                })
                .catch(collected => {
            
                    const no_response = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setDescription('❌ Deletation has been cancelled since you did not reposnd in time!')

                    embedMsg.edit({embeds: [no_response]})
                    .then(() => {
                        embedMsg.reactions.removeAll();
                    });
                })
            })
    }
}