const fs = require('fs')

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, Discord, client){
        if (!interaction.isCommand()) return;

        const commandFolders = fs.readdirSync('./discord/slash_commands/')
        for(const folder of commandFolders){

            const commandFiles = fs.readdirSync('./discord/slash_commands/' + folder).filter(file => file.endsWith('.js'))
            for(const file of commandFiles){

                const command = require('../slash_commands/' + folder + '/' + file)
    
                if(command.data){
                    if(interaction.commandName == command.data.toJSON().name){
                        client.slashCommands.get(command.data.toJSON().name).execute(Discord, client, interaction)
                    }
                }
            }
        }
    }
}