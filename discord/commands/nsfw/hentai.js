module.exports = {
    name: 'hentai',
    nsfw: true,

    async execute(Discord, client, message, args, PREFIX){

        const NSFW = require('discord-nsfw')
        const nsfw = new NSFW()

        if(!message.channel.nsfw) {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | This command only works in nsfw channel!')

            return message.channel.send({embeds: [embed]})
        }
        
        const image = await nsfw.hentai()
        const embed = new Discord.MessageEmbed()
            .setTitle(`Hentai Image`)
            .setColor('RANDOM')
            .setImage(image);
        message.channel.send({embeds: [embed]});
    }
}