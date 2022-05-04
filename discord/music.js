module.exports = {
    music: (Discord, client) => {
        main(Discord, client)
    }
}

const main = (Discord, client) => {

    const { DisTube } = require('distube')
    const { SpotifyPlugin } = require('@distube/spotify')
    const { SoundCloudPlugin } = require('@distube/soundcloud')
    const { YtDlpPlugin } = require('@distube/yt-dlp')

    client.emotes = client.config.emoji
    client.distube = new DisTube(client,
        {
            leaveOnStop: false,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            plugins: [
                new SpotifyPlugin({emitEventsAfterFetching: true}),
                new SoundCloudPlugin(),
                new YtDlpPlugin()
            ],
            youtubeDL: false
        }
    )

    const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``  

    client.distube
    .on('playSong', (queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription(`${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
        queue.textChannel.send({embeds: [embed]})
    })
    .on('addSong', (queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${client.emotes.success} | Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`)
        queue.textChannel.send({embeds: [embed]})
    })
    .on('addList', (queue, playlist) => {
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
        queue.textChannel.send({embeds: [embed]})
    })
    .on('error', (queue, e) => {
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
        queue.textChannel.send({embeds: [embed]})
        console.error(e)
    })
    .on('empty', (queue) => {
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(client.emotes.error + ' | Voice channel is empty! Leaving the channel...')
        queue.textChannel.send({embeds: [embed]})
    })
    .on('searchNoResult', (queue, query) => {
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`${client.emotes.error} | No result found for \`${query}\`!`)
        queue.channel.send({embeds: [embed]})
    })
    .on('finish', (queue) => {
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(client.emotes.success + ' | Finished!')
        queue.textChannel.send({embeds: [embed]})
    })

}