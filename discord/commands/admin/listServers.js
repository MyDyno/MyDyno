module.exports = {
    name: 'listservers',
    alts: ['ls'],

    async execute(Discord, client, message, args, PREFIX){
        
        if(message.author.id == client.config.botDeveloperId){

            let guildArray = new Array();
            client.guilds.cache.forEach((guild) => {
                guildArray.push(guild.name)
            })
            const embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription('```\n' + guildArray.join(',\n').toString() + '\n```')

            message.channel.send({ embeds: [embed] })
        }
        else{

            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | This command is limited to the application owner only!')

            return message.channel.send({embeds: [embed]})
        }
    }
}