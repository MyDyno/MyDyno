let clientToReturn;

module.exports = {
    discordBotMain: function(){
        main()
        this.discordClient = () => {
            return clientToReturn
        }
    }
}

async function main(){
    
    const Discord = require('discord.js');
    const client = new Discord.Client(
        {
             intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES],
            partials: ["CHANNEL", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "MESSAGE", "REACTION", "USER"]
        }
    );

    client.config = require('./config.json')
    let token = process.env.token || client.config.betaToken
    client.login(token);
    
    const fs = require('fs');
    client.wait = require('node:timers/promises').setTimeout;
    
    client.commands = new Discord.Collection();
    client.alts = new Discord.Collection();
    client.events = new Discord.Collection();
    client.slashCommands = new Discord.Collection();

    client.commandsHandler = true;
    client.slashCommandsHandler = true;

    if(token == process.env.token || token == client.config.mainToken){
        const { AutoPoster } = require('topgg-autoposter')
        const ap = AutoPoster(client.config.dbl_token, client)
        ap.on('posted', () => {
            console.log('Discord: Posted discord bot stats to Top.gg!')
        })

        process.on("unhandledRejection", e => {
            console.log('An unhandledRejection occured:\n' + e)
        });
        
        process.on("uncaughtException", e => {
            console.log('An uncaughtException occured:\n' + e)
        });
    }

    const handlerFiles = fs.readdirSync('./discord/handlers/').filter(file => file.endsWith('.js'));
    handlerFiles.forEach(handler => {
        require('./handlers/' + handler)(client, Discord)
    })

    const { setStatus} = require('./setStatus')
    setStatus(Discord, client)

    const { music } = require('./music')
    music(Discord, client)

    const { custom } = require('./custom')
    custom(Discord, client)
    
    function returnDiscordClient(){
        return client;
    }
    clientToReturn = returnDiscordClient()
}