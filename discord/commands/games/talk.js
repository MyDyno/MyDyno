const Chatbot = require('discord-chatbot')
const chatbot = new Chatbot({name: 'MyDyno', gender: 'Male'})

module.exports = {
    name: 'talk',
    alts: ['chat'],

    execute(Discord, client, message, args, PREFIX){
        
        // if(!args[1]){
                        
        //     const noArgs1Embed = new Discord.MessageEmbed()
        //         .setColor('RED')
        //         .setAuthor(message.author.tag, message.author.displayAvatarURL())
        //         .setDescription('Please enter something to talk\nUsage: `' + PREFIX + 'talk [hello there!]`')
        //     message.channel.send( { embeds: [noArgs1Embed] })
        // }
        // else{

        //     chatbot.chat(args.slice(1).join(' ')).then((reply) => {
        //         message.reply(reply)
        //     })
        // }

        message.channel.send('Command Disabled!')
        
    }
}