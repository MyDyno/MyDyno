module.exports = {
    name: 'play',

    alts: ['p'],

    async execute(Discord, client, message, args, PREFIX){
        
        let queue = client.distube.getQueue(message)
        const string = args.slice(1).join(' ')

        if(!message.member.voice.channel){
            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | You need to be in a voice channel!')

            return message.channel.send({embeds: [embed]})
        }

        if (!string){
            if(queue){
                if(queue.paused){
                    queue.resume()
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription(client.emotes.resume + ' | Resumed the song!')
        
                    message.channel.send({embeds: [embed]})
                }
                else{
                    const embed = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setDescription(`${client.emotes.error} | Please enter a song url or query to search.`)
                    return message.channel.send({embeds: [embed]})
                }
            }
            else{
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription(`${client.emotes.error} | Please enter a song url or query to search.`)
                return message.channel.send({embeds: [embed]})
            }
        }
        else{

            const embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setDescription('🔍 | Searching for `' + string + '`')
            message.channel.send({embeds: [embed]})
    
            client.distube.play(message.member.voice.channel, string, 
                {
                    member: message.member,
                    textChannel: message.channel,
                    message
                }
            )
        }
    }
}