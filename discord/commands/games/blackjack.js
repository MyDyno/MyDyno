const blackjack = require("discord-blackjack")

module.exports = {
    name: 'blackjack',
    alts: ['bj'],
    cooldown: 5 * 1000,

    async execute(Discord, client, message, args, PREFIX){

        // let game = await blackjack(message)
        
        // switch (game.result) {
            
        //     case "WIN":
        //         message.channel.send({embeds: [
        //             new Discord.MessageEmbed()
        //             .setTitle("You won!")
        //         ]})
        //         break;
        //     case "LOSE":
        //         message.channel.send({embeds: [
        //             new Discord.MessageEmbed()
        //             .setTitle("You lost!")
        //         ]})
        //     break;
            
        // }

        blackjack(message)
        //https://discord-blackjack.gitbook.io/discord-blackjack/examples
    }        
}