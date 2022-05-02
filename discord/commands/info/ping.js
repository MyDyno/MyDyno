const config = require('../../config.json')

module.exports = {
    name: 'ping',

    execute(Discord, client, message){
        
        message.channel.send('API Latency is: `' + Math.round(client.ws.ping) + 'ms`')
        
    }
}