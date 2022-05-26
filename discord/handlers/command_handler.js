const fs = require('fs');
const commandCountModel = require('../../models/discord/commandCount')

module.exports = async (client, Discord) => {
    const commandFolders = fs.readdirSync('./discord/commands/')
    for(const folder of commandFolders){

        const commandFiles = fs.readdirSync('./discord/commands/' + folder).filter(file => file.endsWith('.js'))
        for(const file of commandFiles){

            const command = require('../commands/' + folder + '/' + file)
    
            if(command.name){
                client.commands.set(command.name, command)
            }
            if(command.alts){
                command.alts.forEach((alt) => {
                    client.alts.set(alt, command)
                })
            }

            command.useCount = 0
        }
    }
}