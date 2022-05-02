const fs = require('fs')

module.exports = (client, Discord) => {
    const eventFiles = fs.readdirSync('./discord/events/').filter(file => file.endsWith('js'));

    for(const file of eventFiles){
        const event = require('../events/' + file)

        if(event.name){
            client.events.set(event.name, event)

            client.on(event.name, (eventParams) => {
                client.events.get(event.name).execute(eventParams, Discord, client)
            })
        }
    }
}