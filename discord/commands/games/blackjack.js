const blackjack = require("discord-blackjack")

module.exports = {
    name: 'blackjack',
    alts: ['bj'],
    cooldown: 5 * 1000,

    async execute(Discord, client, message, args, PREFIX){
        blackjack(message)
    }        
}