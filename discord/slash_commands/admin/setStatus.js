const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription('Change bots status! (Only for application owner)')
        .addStringOption(option => 
            option
            .setName('type')
            .setDescription('Choose status type!')
            .setRequired(true)
            .addChoice('COMPETING', 'COMPETING')
            .addChoice('LISTENING', 'LISTENING')
            .addChoice('PLAYING', 'PLAYING')
            .addChoice('WATCHING', 'WATCHING')
        )
        .addStringOption(option => 
            option
            .setName('default-status')
            .setDescription('Choose status text!')
            .setRequired(false)
            .addChoice('in ${client.guilds.cache.size} guilds!', 'guild_count')
            .addChoice('with ${client.users.cache.size} users!', 'user_count')
        )
        .addStringOption(option => 
            option
            .setName('custom-status')
            .setDescription('Type status text!')
        ),

    async execute(Discord, client, interaction){

        if(interaction.user.id == client.config.botDeveloperId){

            let type = interaction.options.getString('type')
            let defaultStatus = interaction.options.getString('default-status')
            let customStatus = interaction.options.getString('custom-status')
            
            if(!defaultStatus && !customStatus){
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription(client.emotes.error + ' | Atleast one status message required!')
                return await interaction.reply({embeds: [embed], ephemeral: true})
            }

            if(defaultStatus && customStatus){
                const embed = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setDescription(client.emotes.error + ' | You can only have one status message!')
                return await interaction.reply({embeds: [embed], ephemeral: true})
            }

            let typeText;
            if(type == 'COMPETING'){typeText = 'Competing in'}
            else if(type == 'LISTENING'){typeText = 'Listening to'}
            else if(type == 'PLAYING'){typeText = 'Playing'}
            else if(type == 'WATCHING'){typeText = 'Watching'}

            if(defaultStatus){
                if(defaultStatus == 'guild_count'){
                    client.statusMessage = `in ${client.guilds.cache.size} guilds!`
                    client.statusType = type
                    client.statusTypeText = typeText
                    client.refreshGuildCountStatus = true;
                    client.refreshUserCountStatus = false;
                }
                else if(defaultStatus == 'user_count'){
                    client.statusMessage = `with ${client.users.cache.size} users!`
                    client.statusType = type
                    client.statusTypeText = typeText
                    client.refreshGuildCountStatus = false;
                    client.refreshUserCountStatus = true;
                }

                client.user.setActivity(client.statusMessage, {type: type})
                const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription('Status set: `' + typeText + ' ' + client.statusMessage + '`!')
                await interaction.reply({embeds: [embed]})
            }
            else if(customStatus){
                client.statusMessage = customStatus
                client.statusType = type
                client.statusTypeText = typeText
                client.refreshGuildCountStatus = false;
                client.refreshUserCountStatus = false;

                client.user.setActivity(customStatus, {type: type})
                const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription('Status set: `' + typeText + ' ' + customStatus + '`!')
                await interaction.reply({embeds: [embed]})
            }
        }
        else{

            const embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setDescription(client.emotes.error + ' | This command is limited to the application owner only!')
            await interaction.reply({embeds: [embed]})
        }
    }
}