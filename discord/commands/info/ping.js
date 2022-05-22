module.exports = {
    name: 'ping',

    execute(Discord, client, message){
        
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription('API Latency is: `' + Math.round(client.ws.ping) + 'ms`')

        message.channel.send({ embeds: [embed] })
        
    }
}