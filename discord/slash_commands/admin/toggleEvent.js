const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggleevent')
        .setDescription('Toggle client events! (Only for application owner)')
        .addStringOption(option => 
            option
            .setName('event')
            .setDescription('Choose event!')
            .setRequired(true)
            .addChoices(
                {
                    name: 'messageCreate', 
                    value: 'messageCreate',
                },
                {
                    name: 'interactionCreat', 
                    value: 'interactionCreate',
                }
            )
        )
        .addStringOption(option => 
            option
            .setName('toggle')
            .setDescription('Enable/Disable')
            .setRequired(true)
            .addChoices(
                {
                    name: 'Enable',
                    value: 'enabled',
                },
                {
                    name: 'Disable',
                    value: 'disabled',
                }
            )
        ),

    async execute(Discord, client, interaction){

        if(interaction.user.id == client.config.botDeveloperId){

            const event = interaction.options.getString('event');
            const toggle = interaction.options.getString('toggle');

            if(event == 'messageCreate'){
                if(toggle == 'enabled'){
                    client.commandsHandler = true;
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription('The `' + event + '` event is `' + toggle + '`!')
                    await interaction.reply({embeds: [embed], ephemeral: true})
                }
                else if(toggle == 'disabled'){
                    client.commandsHandler = false;
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription('The `' + event + '` event is `' + toggle + '`!')
                    await interaction.reply({embeds: [embed], ephemeral: true})
                }
            }
            else if(event == 'interactionCreate'){
                if(toggle == 'enabled'){
                    client.slashCommandsHandler = true;
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription('The `' + event + '` event is `' + toggle + '`!')
                    await interaction.reply({embeds: [embed], ephemeral: true})
                }
                else if(toggle == 'disabled'){
                    client.slashCommandsHandler = false;
                    const embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setDescription('The `' + event + '` event is `' + toggle + '`!')
                    await interaction.reply({embeds: [embed], ephemeral: true})
                }
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