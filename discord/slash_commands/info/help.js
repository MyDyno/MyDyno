const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Bot help command!'),

    async execute(Discord, client, interaction){
        
        await interaction.derefReply()
        await client.wait(3000)
        await interaction.deleteReply()
        client.commands.get('help').execute(Discord, client, interaction)
    }
}