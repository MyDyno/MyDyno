module.exports = {
    name: 'pornsearch',
    alts: ['ps'],

    async execute(Discord, client, message, args, PREFIX){
        
        if(!message.channel.nsfw) {
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | This command only works in nsfw channel!')

            return message.channel.send({embeds: [embed]})
        }
        const Pornsearch = require('pornsearch')
        const Searcher = new Pornsearch('tits')

        Searcher.videos().then(videos => message.channel.send(videos))

        Searcher.videos()
        .then(videos => message.channel.send(videos)
        .then(() => Pornsearch.gifs())
        .then(gifs => message.channel.send(gifs)));

        Pornsearch.search('pussy')
        .gifs()
        .then(gifs => message.channel.send(gifs));

        Pornsearch.gifs(3)
        .then(gifs => console.log(gifs.map(gif => gif.url)));
    }
}