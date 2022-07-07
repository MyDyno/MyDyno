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
            .addChoices(
                {
                    name: 'COMPETING',
                    value: 'COMPETING',
                },
                {
                    name: 'LISTENING',
                    value: 'LISTENING',
                },
                {
                    name: 'PLAYING',
                    value: 'PLAYING',
                },
                {
                    name: 'WATCHING',
                    value: 'WATCHING',
                }
            )
        )
        .addStringOption(option => 
            option
            .setName('default-status')
            .setDescription('Choose status text!')
            .setRequired(false)
            .addChoices(
                {
                    name: 'in ${client.guilds.cache.size} guilds!',
                    value:'guild_count',
                },
                {
                    name: 'with ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!',
                    value:'user_count',
                }
            )
        )
        .addStringOption(option => 
            option
            .setName('custom-status')
            .setDescription('Type status text!')
        ),

    async execute(Discord, client, interaction){

        if(client.config.botDeveloperId.includes(interaction.user.id)){

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

            let statusTypeText;
            if(type == 'COMPETING'){statusTypeText = 'Competing in'}
            else if(type == 'LISTENING'){statusTypeText = 'Listening to'}
            else if(type == 'PLAYING'){statusTypeText = 'Playing'}
            else if(type == 'WATCHING'){statusTypeText = 'Watching'}

            if(defaultStatus){
                let statusMessage;

                if(defaultStatus == 'guild_count'){
                    statusMessage = `in ${client.guilds.cache.size} guilds!`
                    client.statusType = type
                    client.refreshGuildCountStatus = true;
                    client.refreshUserCountStatus = false;
                }
                else if(defaultStatus == 'user_count'){
                    statusMessage = `with ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`
                    client.statusType = type
                    client.refreshGuildCountStatus = false;
                    client.refreshUserCountStatus = true;
                }

                client.user.setActivity(statusMessage, {type: type})
                const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription('Status set: `' + statusTypeText + ' ' + statusMessage + '`!')
                await interaction.reply({embeds: [embed]})
            }
            else if(customStatus){
                client.refreshGuildCountStatus = false;
                client.refreshUserCountStatus = false;

                client.user.setActivity(customStatus, {type: type})
                const embed = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setDescription('Status set: `' + statusTypeText + ' ' + customStatus + '`!')
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