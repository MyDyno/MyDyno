const fs = require('fs')

module.exports = async (client, Discord) => {
    
    let token = process.env.token || client.config.betaToken
    let clientID;
    if(token == process.env.token){clientID = client.config.mainId}
    else if(token == client.config.betaToken){clientID = client.config.betaId}
    const { REST } = require('@discordjs/rest')
    const { Routes } = require('discord-api-types/v9')
    const rest = new REST({version: '9'}).setToken(token)
    const commands = new Array();
    const fs = require('fs')
    
    const commandFiles = fs.readdirSync('./discord/slash_commands/').filter(file => file.endsWith('.js'))
    for(const file of commandFiles){
        const command = require('../slash_commands/' + file)

        if(command.data){
            commands.push(command.data.toJSON())
            client.slashCommands.set(command.data.toJSON().name, command)
        }
    }
        
    try{
        await rest.put(Routes.applicationCommands(clientID), {body: commands});
    }
    catch(error){
        console.error(error);
    } 
}