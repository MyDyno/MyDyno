module.exports = {
    name: 'help',

    alts: ['h'],

    execute(Discord, client, message, args, PREFIX){

        let clientCommands = client.commands.map(cmd => `\`${cmd.name}\``).join(', ')
        
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle(client.user.username + ' | Help')
            .setDescription('Bot help command!')
            .setColor("GREEN")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: 'List of commands:',
                    value: clientCommands
                },
                {
                    name: 'Links:',
                    value:
                        ':small_blue_diamond: [Invite](' + client.config.botInvite + ')' + '\n' +
                        ':small_blue_diamond: [Vote - Top.gg](' + client.config.voteBot + ')' + '\n' +
                        ':small_blue_diamond: [Support Server](' + client.config.supportServer + ')' + '\n'
                }
            )
            .setFooter(client.user.username + ' developed by ' + client.config.botDeveloper)

        message.channel.send({embeds: [helpEmbed]})
    }
}

// const embed = new Discord.MessageEmbed()
//     .setColor('GREEN')
//     .setThumbnail(client.user.displayAvatarURL())
//     .setAuthor(message.author.tag, message.author.displayAvatarURL())
//     .addFields(
//         {
//             name: 'All users / info commands',
//             value: '`help` `info` `ping` `invite`',
//             inline: true,
//         },
//         {
//             name: 'Play games and earn money',
//             value: '`rps` `quiz`',
//             inline: true,
//         },
//         {
//             name: 'Make or delete your bank account',
//             value: '`ecrt` `edel`',
//             inline: true,
//         },
//         {
//             name: 'Check your balance or pay some',
//             value: '`bal` `pay`',
//             inline: true,
//         },
//         {
//             name: 'Deposite or withdraw money',
//             value: '`dep` `with`',
//             inline: true,
//         },
//         {
//             name: 'Earn some money',
//             value: '`daily` `work`, `fish`, `hunt`',
//             inline: true,
//         },
//         {
//             name: 'Shop items and check inventory',
//             value: '`shop` `inv` `buy` `sell`',
//             inline: true,
//         },
//         {
//             name: 'Fun AI and other commands',
//             value: '`talk` `meme` `truth` `dare`',
//             inline: true,
//         },
//         {
//             name: 'Moderation commands',
//             value: '`kick` `ban` `slowmode` `purge`',
//             inline: true,
//         },
//         {
//             name: 'Settings and utility commands ',
//             value: '`prefix` `serverinfo` `avatar` ',
//             inline: true,
//         },
//         {
//             name: 'Music commands!',
//             value: '`mp3`' 
//         }
//     )
//     .setFooter(client.user.username + ' developed by ' + client.config.botDeveloper)

// message.channel.send({ embeds: [embed] })