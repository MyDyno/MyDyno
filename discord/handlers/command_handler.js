const fs = require('fs');
const commandCountModel = require('../../models/discord/commandUseCount')

module.exports = async (client, Discord) => {

    let token = process.env.token || client.config.betaToken
    let modelName;
    if(token == process.env.token){
        modelName = 'main'
    }
    else if(token == client.config.betaToken){
        modelName = 'beta'
    }

    let myCommandCountModel = await commandCountModel.findOne({name: modelName})
    if(!myCommandCountModel){
        let createdModel = await commandCountModel.create({
            name: modelName,
            commands: []
        })
        await createdModel.save() //error: if myCommandCountModel does not exist, it goes to next line of code before creating model //error on line 43 "commands not found"
    }

    let toPushToModel = new Array()

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

            let myCount = await myCommandCountModel.commands.find((cmd) => cmd.name == command.name)
            if(!myCount){
                command.useCount = 0
                toPushToModel.push(
                    {
                        name: command.name,
                        count: 0
                    }
                )
            }
            else{
                command.useCount = myCount.count
                toPushToModel.push(
                    {
                        name: command.name,
                        count: myCount.count
                    }
                )
            }
        }
    }

    await commandCountModel.findOneAndReplace(
        {name: modelName},
        {
            name: modelName,
            commands: toPushToModel
        }
    )
}