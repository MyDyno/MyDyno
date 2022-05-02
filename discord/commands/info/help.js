const config = require('../../config.json')

module.exports = {
    name: 'help',

    execute(Discord, client, message, args, PREFIX){

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
        //     .setFooter(client.user.username + ' developed by ' + config.botDeveloper)

        // message.channel.send({ embeds: [embed] })
        
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle(client.user.username + ' | Help')
            .setDescription('Bot help command!')
            .setColor("GREEN")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: 'List of commands:',
                    value: 
                        '`help` `info` `ping` `invite` `rps` `quiz` `ecrt` `edel` `bal` `pay` `dep` `with` `daily` `work` `fish` `hunt` `shop` `inv` `buy` `sell` `talk` `meme` `truth` `dare` `kick` `ban` `slowmode` `purge` `prefix` `serverinfo` `avatar` `mp3`'
                        
                },
                {
                    name: 'Links:',
                    value:
                        ':small_blue_diamond: [Invite](' + config.botInvite + ')' + '\n' +
                        ':small_blue_diamond: [Vote - Top.gg](' + config.voteBot + ')' + '\n' +
                        ':small_blue_diamond: [Support Server](' + config.supportServer + ')' + '\n'
                }
            )
            .setFooter(client.user.username + ' developed by ' + config.botDeveloper)

        message.channel.send({embeds: [helpEmbed]})
    }
}