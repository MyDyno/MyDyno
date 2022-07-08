module.exports = async (client, Discord, message) => {

    const config = require('./config.json')
    const { ShardingManager } = require('discord.js')
    const manager = new ShardingManager('./main.js', { token: process.env.token })
    
    manager.on('shardCreate', (shard) => {
        console.log('Launched shard: ' + shard.id)
    })

    manager.spawn()
}