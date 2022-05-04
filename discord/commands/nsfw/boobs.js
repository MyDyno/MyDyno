module.exports = {
    name: 'boobs',

    async execute(Discord, client, message, args, PREFIX){

        if(!message.channel.nsfw) {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | This command only works in nsfw channel!')

            return message.channel.send({embeds: [embed]})
        }
        
        
    }
}